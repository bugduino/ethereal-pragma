import React, { Component } from 'react';
import styles from './LandingForm.module.scss';

import RimbleWeb3 from "../utilities/RimbleWeb3";
import TransactionToastUtil from "../utilities/TransactionToastUtil";

import SmartContractControls from "../utilities/SmartContractControls";
// import TransactionsCard from "../utilities/components/TransactionsCard";

class LandingForm extends Component {
  render() {
    return (
      <RimbleWeb3.Consumer>
        {({
          contract,
          account,
          transactions,
          initContract,
          initAccount,
          contractMethodSendWrapper,
          web3
        }) => (
          <div className={[styles.body]}>
            <SmartContractControls
              web3={web3}
              contract={contract}
              account={account}
              transactions={transactions}
              initContract={initContract}
              contractMethodSendWrapper={contractMethodSendWrapper}
            />
            <TransactionToastUtil transactions={transactions} />
          </div>
            // <TransactionsCard transactions={transactions} />
        )}
      </RimbleWeb3.Consumer>
    );
  }
}

export default LandingForm;
