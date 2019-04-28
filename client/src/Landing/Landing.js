import React, { Component } from 'react';
import { Button, Box } from 'rimble-ui'
import { PublicAddress } from 'rimble-ui';
import { QR } from 'rimble-ui';
import styles from './Landing.module.scss';

class Landing extends Component {
  state = {
    storageValue: 0,
    contract: null,
    genericError: null,
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
    const { web3, account, network, accountBalance } = this.props;
    const { genericError, storageValue } = this.state;

    return (
      <Box
        style={{
          paddingBottom: !network.isCorrectNetwork ? "8em" : "0"
        }}
      >
        <div>
          <header>
            <h1>Pragma</h1>
          </header>
          <div className={[styles.body]}>
            {account &&
              <div>
                <span>Balance {accountBalance} </span>
                <QR value={account} />
                <PublicAddress address={account} />
              </div>
            }

            {genericError &&
              <p>{genericError}</p>
            }
            <div>The stored value is: {storageValue}</div>
          </div>
        </div>
      </Box>
    );
  }
}

export default Landing;
