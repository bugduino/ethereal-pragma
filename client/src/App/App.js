import React, { Component } from "react";
// import SimpleStorageContract from "../contracts/SimpleStorage.json";
import { ThemeProvider } from "rimble-ui";
import Web3 from "web3"; // uses latest 1.x.x version
import { Web3Consumer } from 'web3-react'

import styles from './App.module.scss';

import { ToastMessage } from 'rimble-ui';

import theme from "../theme";
import RimbleWeb3 from "../utilities/RimbleWeb3";
import Header from "../utilities/components/Header";
import Landing from "../Landing/Landing";
import Web3Debugger from "../Web3Debugger/Web3Debugger";

import Web3Provider from 'web3-react';
import connectors from './connectors';

class App extends Component {
  state = {
    genericError: null,
    // route: "onboarding"
    route: "default"
  };

  // Optional parameters to pass into RimbleWeb3
  config = {
    accountBalanceMinimum: 0.0001,
    requiredNetwork: 4
  };

  showRoute(route) {
    this.setState({ route });
  };

  render() {
    return (
      <Web3Provider
        connectors={connectors}
        libraryName={'web3.js'}
        web3Api={Web3}
      >
        <Web3Consumer>
          {context => {
            return (
              <ThemeProvider theme={theme} className="App">
                <RimbleWeb3 config={this.config} context={context}>
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
                        <Header
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
                        />

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
                          <Landing
                            web3={web3}
                            account={account}
                            accountBalance={accountBalance}
                            accountBalanceLow={accountBalanceLow}
                            network={network}
                          />
                        ) : null}

                        <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
                      </div>
                    )}
                  </RimbleWeb3.Consumer>
                </RimbleWeb3>
              </ThemeProvider>
            );
          }}
        </Web3Consumer>
      </Web3Provider>
    );
  }
}

export default App;
