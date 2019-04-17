import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import initInfuraWeb3 from "../utils/initInfuraWeb3";
import { ThemeProvider } from "rimble-ui";

import styles from './App.module.scss';

import { Button } from 'rimble-ui'
import { MetaMaskButton } from 'rimble-ui';
import { PublicAddress } from 'rimble-ui';
import { UPortButton } from 'rimble-ui';
import { QR } from 'rimble-ui';
import { ToastMessage } from 'rimble-ui';

import theme from "../theme";
import RimbleWeb3 from "../utilities/RimbleWeb3";
import Web3Debugger from "../Web3Debugger/Web3Debugger";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    genericError: null,
    route: "onboarding"
    // route: "default"
  };

  // Optional parameters to pass into RimbleWeb3
  config = {
    accountBalanceMinimum: 0.0001,
    requiredNetwork: 4
  };

  showRoute(route) {
    this.setState({ route });
  };

  async connectWithMetamask() {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: deployedNetwork && deployedNetwork.address && instance });
      // this.setState({ web3, accounts, contract: deployedNetwork && deployedNetwork.address && instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  componentDidMount = async () => {
    // await initInfuraWeb3();
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;
  //   if (!contract) {
  //     return this.setState({genericError: 'Contract not present in this network'});
  //   }
  //   if (!accounts || !accounts.length) {
  //     return this.setState({genericError: 'No ETH accounts found'});
  //   }
  //   // TODO why await does not work???
  //   // const res = await contract.methods.set(5).send({ from: accounts[0] });
  //
  //   contract.methods.set(10).send({ from: accounts[0] }, async () => {
  //     // Get the value from the contract to prove it worked.
  //     const response = await contract.methods.get().call();
  //     // Update state with the result.
  //     this.setState({ storageValue: response.toString() });
  //   })
  // };

  render() {
    const { web3, genericError, accounts } = this.state;
    const account = accounts && accounts.length && accounts[0];
    // if (!web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }

    return (
      <ThemeProvider theme={theme} className="App">
        <RimbleWeb3 config={this.config}>
          <RimbleWeb3.Consumer>
            {({
              needsPreflight,
              validBrowser,
              userAgent,
              web3,
              account,
              accountBalance,
              accountBalanceLow,
              initAccount,
              rejectAccountConnect,
              userRejectedConnect,
              accountValidated,
              accountValidationPending,
              rejectValidation,
              userRejectedValidation,
              validateAccount,
              connectAndValidateAccount,
              modals,
              network,
              transaction
            }) => (
              <div className={[styles.main]}>
                {this.state.route === "onboarding" ? (
                  <Web3Debugger
                    validBrowser={validBrowser}
                    userAgent={userAgent}
                    web3={web3}
                    account={account}
                    accountBalance={accountBalance}
                    accountBalanceLow={accountBalanceLow}
                    initAccount={initAccount}
                    rejectAccountConnect={rejectAccountConnect}
                    userRejectedConnect={userRejectedConnect}
                    accountValidated={accountValidated}
                    accountValidationPending={accountValidationPending}
                    rejectValidation={rejectValidation}
                    userRejectedValidation={userRejectedValidation}
                    validateAccount={validateAccount}
                    connectAndValidateAccount={connectAndValidateAccount}
                    modals={modals}
                    network={network}
                    transaction={transaction}
                  />
                ) : null}

                {this.state.route === "default" ? (
                  <div>
                    <header>
                      <h1>Pragma</h1>
                    </header>
                    <div className={[styles.body]}>
                      <MetaMaskButton.outline size="large" onClick={this.connectWithMetamask.bind(this)}>
                        Connect with MetaMask
                      </MetaMaskButton.outline>

                      <UPortButton size="large">
                        Connect with uPort
                      </UPortButton>
                      {account &&
                        <div>
                          <QR value={account} />
                          <PublicAddress address={account} />
                        </div>
                      }
                      <Button
                        mb={3}
                        onClick={e =>
                          window.toastProvider.addMessage('Processing payment...', {
                            secondaryMessage: 'Check progress on Etherscan',
                            actionHref:
                              'https://etherscan.io/tx/0xcbc921418c360b03b96585ae16f906cbd48c8d6c2cc7b82c6db430390a9fcfed',
                            actionText: 'Check',
                            variant: 'processing', // success, failure
                          })
                        }
                      >
                        Preview
                      </Button>

                      {genericError &&
                        <p>{genericError}</p>
                      }
                      <div>The stored value is: {this.state.storageValue}</div>
                    </div>
                  </div>
                ) : null}

                <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
              </div>
            )}
          </RimbleWeb3.Consumer>
        </RimbleWeb3>
      </ThemeProvider>

    );
  }
}

export default App;
