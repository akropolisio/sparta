/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

/// <reference types="truffle-typings" />

import * as TruffleContracts from ".";

declare global {
  namespace Truffle {
    interface Artifacts {
      require(name: "AccessModule"): TruffleContracts.AccessModuleContract;
      require(name: "AccountsModule"): TruffleContracts.AccountsModuleContract;
      require(
        name: "APYBalancedDefiModule"
      ): TruffleContracts.APYBalancedDefiModuleContract;
      require(name: "Base"): TruffleContracts.BaseContract;
      require(
        name: "BaseFundsModule"
      ): TruffleContracts.BaseFundsModuleContract;
      require(name: "BondingCurve"): TruffleContracts.BondingCurveContract;
      require(name: "CErc20Stub"): TruffleContracts.CErc20StubContract;
      require(
        name: "CompoundDAIStub"
      ): TruffleContracts.CompoundDAIStubContract;
      require(name: "CompoundModule"): TruffleContracts.CompoundModuleContract;
      require(name: "Context"): TruffleContracts.ContextContract;
      require(name: "CoreInterface"): TruffleContracts.CoreInterfaceContract;
      require(
        name: "CurveFiDepositStub"
      ): TruffleContracts.CurveFiDepositStubContract;
      require(
        name: "CurveFiSwapStub"
      ): TruffleContracts.CurveFiSwapStubContract;
      require(
        name: "CurveFiTokenStub"
      ): TruffleContracts.CurveFiTokenStubContract;
      require(name: "CurveFiYModule"): TruffleContracts.CurveFiYModuleContract;
      require(
        name: "CurveFiYProtocol"
      ): TruffleContracts.CurveFiYProtocolContract;
      require(name: "CurveModule"): TruffleContracts.CurveModuleContract;
      require(
        name: "DefiFundsModule"
      ): TruffleContracts.DefiFundsModuleContract;
      require(name: "DefiModuleBase"): TruffleContracts.DefiModuleBaseContract;
      require(name: "DefiModuleStub"): TruffleContracts.DefiModuleStubContract;
      require(
        name: "DefiOperatorRole"
      ): TruffleContracts.DefiOperatorRoleContract;
      require(
        name: "DistributionToken"
      ): TruffleContracts.DistributionTokenContract;
      require(name: "ERC165"): TruffleContracts.ERC165Contract;
      require(name: "ERC20"): TruffleContracts.ERC20Contract;
      require(name: "ERC20Burnable"): TruffleContracts.ERC20BurnableContract;
      require(name: "ERC20Detailed"): TruffleContracts.ERC20DetailedContract;
      require(name: "ERC20Mintable"): TruffleContracts.ERC20MintableContract;
      require(name: "ERC721"): TruffleContracts.ERC721Contract;
      require(name: "ERC721Burnable"): TruffleContracts.ERC721BurnableContract;
      require(name: "ERC721Metadata"): TruffleContracts.ERC721MetadataContract;
      require(name: "FreeDAI"): TruffleContracts.FreeDAIContract;
      require(name: "FundsModule"): TruffleContracts.FundsModuleContract;
      require(
        name: "FundsModuleStub"
      ): TruffleContracts.FundsModuleStubContract;
      require(
        name: "FundsOperatorRole"
      ): TruffleContracts.FundsOperatorRoleContract;
      require(name: "IAccessModule"): TruffleContracts.IAccessModuleContract;
      require(name: "ICErc20"): TruffleContracts.ICErc20Contract;
      require(
        name: "ICurveFiDeposit"
      ): TruffleContracts.ICurveFiDepositContract;
      require(name: "ICurveFiSwap"): TruffleContracts.ICurveFiSwapContract;
      require(name: "ICurveModule"): TruffleContracts.ICurveModuleContract;
      require(name: "IDefiModule"): TruffleContracts.IDefiModuleContract;
      require(name: "IDefiProtocol"): TruffleContracts.IDefiProtocolContract;
      require(name: "IERC165"): TruffleContracts.IERC165Contract;
      require(name: "IERC20"): TruffleContracts.IERC20Contract;
      require(name: "IERC721"): TruffleContracts.IERC721Contract;
      require(
        name: "IERC721Metadata"
      ): TruffleContracts.IERC721MetadataContract;
      require(
        name: "IERC721Receiver"
      ): TruffleContracts.IERC721ReceiverContract;
      require(name: "IFundsModule"): TruffleContracts.IFundsModuleContract;
      require(
        name: "ILiquidityModule"
      ): TruffleContracts.ILiquidityModuleContract;
      require(
        name: "ILoanLimitsModule"
      ): TruffleContracts.ILoanLimitsModuleContract;
      require(name: "ILoanModule"): TruffleContracts.ILoanModuleContract;
      require(
        name: "ILoanProposalsModule"
      ): TruffleContracts.ILoanProposalsModuleContract;
      require(name: "IPToken"): TruffleContracts.IPTokenContract;
      require(
        name: "IRAYNAVCalculator"
      ): TruffleContracts.IRAYNAVCalculatorContract;
      require(
        name: "IRAYPortfolioManager"
      ): TruffleContracts.IRAYPortfolioManagerContract;
      require(name: "IRAYStorage"): TruffleContracts.IRAYStorageContract;
      require(
        name: "ITestnetCompoundDAI"
      ): TruffleContracts.ITestnetCompoundDAIContract;
      require(name: "IYErc20"): TruffleContracts.IYErc20Contract;
      require(
        name: "LiquidityModule"
      ): TruffleContracts.LiquidityModuleContract;
      require(
        name: "LoanLimitsModule"
      ): TruffleContracts.LoanLimitsModuleContract;
      require(name: "LoanModule"): TruffleContracts.LoanModuleContract;
      require(name: "LoanModuleStub"): TruffleContracts.LoanModuleStubContract;
      require(
        name: "LoanProposalsModule"
      ): TruffleContracts.LoanProposalsModuleContract;
      require(name: "MintableToken"): TruffleContracts.MintableTokenContract;
      require(name: "MinterRole"): TruffleContracts.MinterRoleContract;
      require(name: "Module"): TruffleContracts.ModuleContract;
      require(name: "Ownable"): TruffleContracts.OwnableContract;
      require(name: "Pausable"): TruffleContracts.PausableContract;
      require(name: "PauserRole"): TruffleContracts.PauserRoleContract;
      require(name: "Pool"): TruffleContracts.PoolContract;
      require(name: "PToken"): TruffleContracts.PTokenContract;
      require(name: "RAYModule"): TruffleContracts.RAYModuleContract;
      require(
        name: "RAYProtocol_DAI"
      ): TruffleContracts.RAYProtocol_DAIContract;
      require(name: "RAYProtocol"): TruffleContracts.RAYProtocolContract;
      require(name: "RAYStub"): TruffleContracts.RAYStubContract;
      require(
        name: "TestAddressList"
      ): TruffleContracts.TestAddressListContract;
      require(
        name: "TestnetCErc20Proxy"
      ): TruffleContracts.TestnetCErc20ProxyContract;
      require(name: "TestSQRT"): TruffleContracts.TestSQRTContract;
      require(name: "TokenModule"): TruffleContracts.TokenModuleContract;
      require(name: "VotesModule"): TruffleContracts.VotesModuleContract;
      require(
        name: "WhitelistAdminRole"
      ): TruffleContracts.WhitelistAdminRoleContract;
      require(
        name: "WhitelistedRole"
      ): TruffleContracts.WhitelistedRoleContract;
      require(name: "YTokenStub"): TruffleContracts.YTokenStubContract;
    }
  }
}
