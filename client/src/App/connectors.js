import { Connectors } from "web3-react";
import TrezorApi from "trezor-connect";
// import WalletConnectApi from "@walletconnect/web3-subprovider";
import FortmaticApi from "fortmatic";
// import PortisApi from "@portis/web3";

const {
  InjectedConnector,
  // NetworkOnlyConnector,
  TrezorConnector,
  LedgerConnector,
  // WalletConnectConnector,
  FortmaticConnector,
  // PortisConnector
} = Connectors;

const supportedNetworkURLs = {
  1: 'https://mainnet.infura.io/v3/xxxx',
  4: 'https://rinkeby.infura.io/v3/xxxx',
};
const manifestEmail = 'xxx@gmail.com'; // trezor
const manifestAppUrl = 'https://xxx'; // trezor
const defaultNetwork = 1;
const fortmaticApiKey = 'xxx';
// const portisDAppId = 'xxxx';
// const portisNetwork = 'xxx';

const Injected = new InjectedConnector({
  supportedNetworks: [1, 4]
});

// const Network = new NetworkOnlyConnector({
//   providerURL: supportedNetworkURLs[1]
// });

const Trezor = new TrezorConnector({
  api: TrezorApi,
  supportedNetworkURLs,
  defaultNetwork,
  manifestEmail,
  manifestAppUrl
});

const Ledger = new LedgerConnector({
  supportedNetworkURLs,
  defaultNetwork
});

// const WalletConnect = new WalletConnectConnector({
//   api: WalletConnectApi,
//   bridge: "https://bridge.walletconnect.org",
//   supportedNetworkURLs,
//   defaultNetwork
// });

const Fortmatic = new FortmaticConnector({
  api: FortmaticApi,
  apiKey: fortmaticApiKey,
  logoutOnDeactivation: false
});

// const Portis = new PortisConnector({
//   api: PortisApi,
//   dAppId: portisDAppId,
//   network: portisNetwork,
// });

export default {
  Injected,
  Fortmatic,
  // Network,
  Trezor,
  Ledger,
  // WalletConnect,
  // Portis
};
