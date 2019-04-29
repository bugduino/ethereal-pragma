import React from "react";
import { Form, Flex, Box, Text, Button } from "rimble-ui";
import BigNumber from 'bignumber.js';

import contractAbi from './cETH';
// Compound v2 rinkeby cETH contract
const contractAddress = "0xbed6d9490a7cd81ff0f06f29189160a9641a358f";

class SmartContractControls extends React.Component {
  state = {
    value: 0,
    lendAmount: 0,
    needsUpdate: false
  };

  getSupplyRatePerBlock = async () => {
    let value = await this.genericCall('supplyRatePerBlock');
    if (value) {
      const web3 = this.props.web3;
      const BNify = s => new BigNumber(String(s));
      // TODO get rate from compound directly
      value = BNify(value).times('2102666.66667').times('100').integerValue(BigNumber.ROUND_FLOOR) // blocks in a year (15 sec block time)
      value = web3.utils.fromWei(
        value.toString(),
        "ether"
      );
      this.setState({ value: (+value).toFixed(2), needsUpdate: false });
    }
    return value;
  };
  // getExchangeRateCurrent = async () => {
  //   let exchangeRateCurrent = await this.genericCall('exchangeRateCurrent');
  //   if (exchangeRateCurrent) {
  //     exchangeRateCurrent = this.props.web3.utils.fromWei(
  //       exchangeRateCurrent.toString(),
  //       "ether"
  //     );
  //     this.setState({ exchangeRateCurrent, needsUpdate: false });
  //   }
  //   return exchangeRateCurrent;
  // };

  getBalanceOf = async () => {
    let balanceOf = await this.genericCall('balanceOf', [this.props.account]);
    if (balanceOf) {
      balanceOf = this.props.web3.utils.fromWei(
        balanceOf.toString(),
        "ether"
      );
      this.setState({ balanceOf, needsUpdate: false });
    }
    return balanceOf;
  };

  // getAssetsIn = async () => {
  //   let assetsIn = await this.genericCall('getAssetsIn', [this.props.account]);
  //   if (assetsIn) {
  //     this.setState({ assetsIn, needsUpdate: false });
  //   }
  //   return assetsIn;
  // };
  //
  // getAccountLiquidity = async () => {
  //   let accountLiquidity = await this.genericCall('getAccountLiquidity', [this.props.account]);
  //   if (accountLiquidity) {
  //     this.setState({ accountLiquidity, needsUpdate: false });
  //   }
  //   return accountLiquidity;
  // };

  genericCall = async (methodName, params = []) => {
    const value = await this.props.contract.methods[methodName](...params).call().catch(error => {
      console.log(`${methodName} error: `, error);
      this.setState({ error });
    });
    console.log(`${methodName} value: `, value, value.toString());
    return value;
  }

  // Check for updates to the transactions collection
  processTransactionUpdates = prevProps => {
    Object.keys(this.props.transactions).map(key => {
      let tx = this.props.transactions[key];
      if (tx.status === "success" && this.state.needsUpdate) {
        console.log("Getting updated balance in acc and in cTokens.");
        this.getBalanceOf(); // do not wait
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

  componentDidMount() {
    // Init the contract after the web3 provider has been determined
    this.props.initContract(contractAddress, contractAbi).then(() => {
      // Can finally interact with contract
      this.getSupplyRatePerBlock();
      // this.getExchangeRateCurrent();
      if (this.props.account) {
        this.getBalanceOf();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.account && prevProps.account !== this.props.account) {
      this.getBalanceOf();
    }
    this.processTransactionUpdates(prevProps);
  }

  render() {
    return (
      <Box>
        <Box py={4}>
          <Text fontSize={6} textAlign={"center"}>
            Earn {this.state.value} % APR
          </Text>
          {this.state.balanceOf && this.state.balanceOf !== '0' &&
            <Text fontSize={6} textAlign={"center"}>
              cEthers {this.state.balanceOf}
            </Text>
          }
        </Box>

        <Form onSubmit={this.handleSubmit} width={1}>
          <Flex>
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
          {this.state.balanceOf && this.state.balanceOf !== '0' &&
            <Button size={"medium"} onClick={this.redeem} bg='navy'>
              Redeem All
            </Button>
          }
        </Form>
      </Box>
    );
  }
}

export default SmartContractControls;
