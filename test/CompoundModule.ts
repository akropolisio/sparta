import { 
    FreeDAIContract, FreeDAIInstance,
    CErc20StubContract, CErc20StubInstance,
    PoolContract, PoolInstance, 
    PTokenContract, PTokenInstance, 
    FundsModuleStubContract, FundsModuleStubInstance,
    CompoundModuleContract, CompoundModuleInstance,
} from "../types/truffle-contracts/index";

// tslint:disable-next-line:no-var-requires
const { BN, constants, expectEvent, expectRevert, shouldFail, time } = require("@openzeppelin/test-helpers");
// tslint:disable-next-line:no-var-requires
const should = require("chai").should();
var expect = require("chai").expect;
const w3random = require("./utils/w3random");
const expectEqualBN = require("./utils/expectEqualBN");

const FreeDAI = artifacts.require("FreeDAI");
const CErc20Stub = artifacts.require("CErc20Stub");
const Pool = artifacts.require("Pool");
const PToken = artifacts.require("PToken");
const CompoundModule = artifacts.require("CompoundModule");
const FundsModuleStub = artifacts.require("FundsModuleStub");

contract("CompoundModule", async ([_, owner, user, ...otherAccounts]) => {
    let dai: FreeDAIInstance;
    let cDai: CErc20StubInstance;
    let pool: PoolInstance;
    let pToken: PTokenInstance;
    let defim: CompoundModuleInstance;
    let funds: FundsModuleStubInstance;
  
    let interesRate:BN, expScale:BN, annualSeconds:BN;

    before(async () => {
        //Setup "external" contracts
        dai = await FreeDAI.new();
        await (<any> dai).methods['initialize()']({from: owner});

        cDai = await CErc20Stub.new();
        await (<any> cDai).methods['initialize(address)'](dai.address, {from: owner});

        //Setup system contracts
        pool = await Pool.new();
        await (<any> pool).methods['initialize()']({from: owner});

        pToken = await PToken.new();
        await (<any> pToken).methods['initialize(address)'](pool.address, {from: owner});

        funds = await FundsModuleStub.new();
        await (<any> funds).methods['initialize(address)'](pool.address, {from: owner});

        defim = await CompoundModule.new();
        await (<any> defim).methods['initialize(address)'](pool.address, {from: owner});

        await pool.set('ltoken', dai.address, false, {from: owner});
        await pool.set('cdai', cDai.address, false, {from: owner});
        await pool.set('ptoken', pToken.address, false, {from: owner});
        await pool.set('funds', funds.address, false, {from: owner});
        await pool.set('defi', defim.address, false, {from: owner});
        await pToken.addMinter(funds.address, {from: owner});
        await defim.addDefiOperator(funds.address, {from: owner});

        interesRate = await cDai.INTEREST_RATE();
        expScale = await cDai.EXP_SCALE();
        annualSeconds = await cDai.ANNUAL_SECONDS();
    });

    it("should handle deposit DAI to Compound", async () => {
        let amount = w3random.interval(100, 1000, 'ether');
        await (<any> dai).methods['mint(uint256)'](amount, {from: user});

        let before = {
            userDai: await dai.balanceOf(user),
            cDaiDai: await dai.balanceOf(cDai.address),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
        };

        await dai.transfer(defim.address, amount, {from: user});
        let receipt = await defim.handleDeposit(user, amount, {from: owner});
        expectEvent(receipt, 'Deposit', {'amount':amount});

        let after = {
            userDai: await dai.balanceOf(user),
            cDaiDai: await dai.balanceOf(cDai.address),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
        };

        expect(after.userDai).to.be.bignumber.eq(before.userDai.sub(amount));
        expect(after.cDaiDai).to.be.bignumber.eq(before.cDaiDai.add(amount));
        expect(after.defimCDai).to.be.bignumber.gt(before.defimCDai);
        expectEqualBN(after.cDaiUnderlying, before.cDaiUnderlying.add(amount), 18, -6); //Accuracy may be bad because of rounding and time passed

    });

    it("should withdraw DAI from Compound", async () => {
        let before = {
            userDai: await dai.balanceOf(user),
            cDaiDai: await dai.balanceOf(cDai.address),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
        };
        let amount = w3random.intervalBN(before.cDaiDai.divn(3), before.cDaiDai.divn(2));

        let receipt = await defim.withdraw(user, amount, {from: owner});
        expectEvent(receipt, 'Withdraw', {'amount':amount});

        let after = {
            userDai: await dai.balanceOf(user),
            cDaiDai: await dai.balanceOf(cDai.address),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
        };

        expect(after.userDai).to.be.bignumber.eq(before.userDai.add(amount));
        expect(after.cDaiDai).to.be.bignumber.eq(before.cDaiDai.sub(amount));
        expect(after.defimCDai).to.be.bignumber.lt(before.defimCDai);
        expectEqualBN(after.cDaiUnderlying, before.cDaiUnderlying.sub(amount), 18, -5); //Accuracy may be bad because of rounding and time passed
    });

    it("should withdraw correct interest from Compound", async () => {
        let beforeTimeShift = {
            userDai: await dai.balanceOf(user),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
        };
        expect(beforeTimeShift.cDaiUnderlying).to.be.bignumber.gt(new BN(0)); // Ensure we have some DAI on pool balance

        //Mint PTK
        let ptkForOwner = w3random.interval(50, 100, 'ether');
        let ptkForUser = w3random.interval(10, 50, 'ether');
        await funds.mintPTokens(owner, ptkForOwner, {from: owner});
        await funds.mintPTokens(user, ptkForUser, {from: owner});
        //console.log(ptkForUser, ptkForOwner);

        let timeShift = w3random.interval(30*24*60*60, 89*24*60*60)
        await time.increase(timeShift);
        await defim.claimDistributions(user);

        let beforeWithdrawInterest = {
            userDai: await dai.balanceOf(user),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
            availableInterest: await defim.availableInterest(user)
        };
        //console.log(beforeTimeShift.cDaiUnderlying, interesRate, timeShift, expScale, annualSeconds);
        let expectedFullInterest = beforeTimeShift.cDaiUnderlying.mul(interesRate).mul(timeShift).div(expScale).div(annualSeconds);
        expectEqualBN(beforeWithdrawInterest.cDaiUnderlying, beforeTimeShift.cDaiUnderlying.add(expectedFullInterest), 18, -5);
        let expectedUserInterest = expectedFullInterest.mul(ptkForUser).div(ptkForOwner.add(ptkForUser));
        expectEqualBN(beforeWithdrawInterest.availableInterest, expectedUserInterest, 18, -5);

        // await defim.claimDistributions(user, {from:user}); //This is not required, but useful to test errors

        let receipt = await defim.withdrawInterest({from: user});
        expectEvent(receipt, 'WithdrawInterest', {'account':user});

        let afterWithdrawInterest = {
            userDai: await dai.balanceOf(user),
            defimCDai: await cDai.balanceOf(defim.address),
            cDaiUnderlying: await cDai.getBalanceOfUnderlying(defim.address),
            availableInterest: await defim.availableInterest(user)
        };
        expectEqualBN(afterWithdrawInterest.userDai, beforeWithdrawInterest.userDai.add(expectedUserInterest), 18, -5);

        expectEqualBN(afterWithdrawInterest.availableInterest, new BN(0), 18, -5);


    });

});
