import React, { Component } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";

import styles from './App.module.scss';

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    genericError: null
  };

  componentDidMount = async () => {
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
    const { web3, genericError } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className={[styles.main]}>
        <header>
          <h1>Foo</h1>
        </header>
        <div className={[styles.body]}>
          <h1>Pragma</h1>
          {genericError &&
            <p>{genericError}</p>
          }
          <div>The stored value is: {this.state.storageValue}</div>
        </div>
      </div>
    );
  }
}

export default App;
