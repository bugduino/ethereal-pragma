import React from "react";
import { Form, Flex, Box, Text, Button } from "rimble-ui";
import BigNumber from 'bignumber.js';

import contractAbi from './cETH';
import { comptrollerAddress, abi } from './Comptroller';
// Compound v2 rinkeby cETH contract
const contractAddress = "0xbed6d9490a7cd81ff0f06f29189160a9641a358f";

class SmartContractControls extends React.Component {
  state = {
    value: 0,
    lendAmount: 0,
    needsUpdate: false
  };

  trimEth = eth => {
    eth = parseFloat(eth);
    eth = eth * 1000000;
    eth = Math.round(eth);
    eth = eth / 1000000;
    eth = eth.toFixed(6);

    return eth;
  };

  BNify = s => new BigNumber(String(s));
  getSupplyRatePerBlock = async () => {
    let value = await this.genericCall('supplyRatePerBlock');
    if (value) {
      const web3 = this.props.web3;
      // TODO get rate from compound directly
      value = this.BNify(value).times('2102666.66667').times('100').integerValue(BigNumber.ROUND_FLOOR) // blocks in a year (15 sec block time)
      value = web3.utils.fromWei(
        value.toString(),
        "ether"
      );
      this.setState({ supplyRatePerBlock: value, value: (+value).toFixed(2), needsUpdate: false });
    }
    return value;
  };
  getExchangeRateCurrent = async () => {
    let exchangeRateCurrent = await this.genericCall('exchangeRateCurrent');
    if (exchangeRateCurrent) {
      exchangeRateCurrent = this.props.web3.utils.fromWei(
        exchangeRateCurrent.toString(),
        "ether"
      );
      if (this.state.supplyRatePerBlock) {
        console.log(this.BNify(this.state.supplyRatePerBlock).times(this.BNify(exchangeRateCurrent)).toString())
      }
      this.setState({ exchangeRateCurrent, needsUpdate: false });
    }
    return exchangeRateCurrent;
  };

  getBalanceOf = async () => {
    let balanceOf = await this.genericCall('balanceOf', [this.props.account]);
    if (balanceOf) {
      balanceOf = this.props.web3.utils.fromWei(
        balanceOf.toString(),
        "ether"
      );
      const ethToReedem = this.BNify(balanceOf).times(this.BNify(this.state.exchangeRateCurrent)).toString();
      this.setState({ balanceOf, ethToReedem, needsUpdate: false });
    }
    return balanceOf;
  };

  getAssetsIn = async () => {
    let assetsIn = await this.genericComptrollerContractCall('getAssetsIn', [this.props.account]);
    if (assetsIn) {
      this.setState({ assetsIn, needsUpdate: false });
    }
    return assetsIn;
  };

  getAccountLiquidity = async () => {
    let accountLiquidity = await this.genericComptrollerContractCall('getAccountLiquidity', [this.props.account]);
    if (accountLiquidity) {
      this.setState({ accountLiquidity, needsUpdate: false });
    }
    return accountLiquidity;
  };

  genericCall = async (methodName, params = []) => {
    const value = await this.props.contract.methods[methodName](...params).call().catch(error => {
      console.log(`${methodName} error: `, error);
      this.setState({ error });
    });
    console.log(`${methodName} value: `, value, value.toString());
    return value;
  }

  // genericComptrollerContractCall = async (methodName, params = []) => {
  //   const value = await this.state.comptrollerContract.methods[methodName](...params).call().catch(error => {
  //     console.log(`${methodName} error: `, error);
  //     this.setState({ error });
  //   });
  //   console.log(`${methodName} value: `, value, value.toString());
  //   return value;
  // }

  // Check for updates to the transactions collection
  processTransactionUpdates = prevProps => {
    Object.keys(this.props.transactions).map(async key => {
      let tx = this.props.transactions[key];
      if (tx.status === "success" && this.state.needsUpdate) {
        console.log("Getting updated balance in acc and in cTokens.");
        const balance = await this.getBalanceOf();
        if (balance && balance !== '0') {
          this.getAssetsIn();
          this.getAccountLiquidity();
        }
        return false;
      } else {
        return false;
      }
    });
  };

  mint = () => {
    const value = this.props.web3.utils.toWei(
      this.state.lendAmount.toString(),
      "ether"
    );
    this.props.contractMethodSendWrapper("mint", [], value);
    this.setState({
      needsUpdate: true
    });
  };

  redeem = () => {
    const value = this.props.web3.utils.toWei(
      this.state.balanceOf.toString(),
      "ether"
    );
    this.props.contractMethodSendWrapper("redeem", [value]);
    this.setState({
      needsUpdate: true
    });
  };

  handleChangeAmount = (e) => {
    this.setState({ lendAmount: e.target.value });
  };

  // createContract = (address, abi) => {
  //   console.log("creating contract", address, abi);
  //   // Create contract on initialized web3 provider with given abi and address
  //   try {
  //     const comptrollerContract = new this.props.web3.eth.Contract(abi, address);
  //     this.setState({ comptrollerContract });
  //   } catch (error) {
  //     console.log(error)
  //     console.log("Could not create contract.", address);
  //   }
  // };

  async componentDidMount() {
    // Init the contract after the web3 provider has been determined
    // if (this.props.web3 && !this.state.comptrollerContract) {
    //   this.createContract(comptrollerAddress, abi);
    // }
    this.props.initContract(contractAddress, contractAbi).then(async () => {
      // Can finally interact with contract
      this.getSupplyRatePerBlock();
      this.getExchangeRateCurrent();
      if (this.props.account) {
        await this.getBalanceOf();
        // const balance = await this.getBalanceOf();
        // if (balance && balance !== '0') {
        //   this.getAssetsIn();
        //   this.getAccountLiquidity();
        // }
      }
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (this.props.web3 && !this.state.comptrollerContract) {
    //   this.createContract(comptrollerAddress, abi);
    // }
    if (this.props.account && prevProps.account !== this.props.account) {
      await this.getBalanceOf();
      // const balance = await this.getBalanceOf();
      // if (balance && balance !== '0') {
      //   this.getAssetsIn();
      //   this.getAccountLiquidity();
      // }
    }
    this.processTransactionUpdates(prevProps);
  }

  render() {
    return (
      <Box>
        <Box py={4}>
          <Text fontSize={6} textAlign={"center"}>
            Earn ~{this.state.value} % APR
          </Text>
          <Text fontSize={3} textAlign={"center"}>
            on your ETH
          </Text>
        </Box>

        <Form onSubmit={this.handleSubmit} pb={4}>
          <Flex justifyContent="center">
            <Box width={9 / 12}>
              <Form.Input
                required={true}
                placeholder="Enter Amount"
                type="text"
                width={1}
                onChange={this.handleChangeAmount}
              />
            </Box>
            <Box width={3 / 12}>
              <Button icon="Send" size={"medium"} mr={4} onClick={this.mint}>
                Lend ETH
              </Button>
            </Box>
          </Flex>
        </Form>

        {this.state.balanceOf && this.state.balanceOf !== '0' &&
          <Box py={4} borderTop={1} borderColor={"#E8E8E8"}>
            <Text fontSize={6} textAlign={"center"}>
              Redeem ~{this.trimEth(this.state.ethToReedem)} ETH
            </Text>
            <Flex justifyContent="center" pt={2}>
              <Button icon="AccountBalanceWallet" size={"medium"} onClick={this.redeem}>
                Withdraw
              </Button>
            </Flex>
          </Box>
        }
      </Box>
    );
  }
}

export default SmartContractControls;
