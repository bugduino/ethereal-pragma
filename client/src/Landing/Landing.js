import React, { Component } from 'react';
import { Box } from 'rimble-ui'
import { PublicAddress } from 'rimble-ui';
import { QR } from 'rimble-ui';
import styles from './Landing.module.scss';
import LandingForm from '../LandingForm/LandingForm';

class Landing extends Component {
  state = {
    contract: null,
    genericError: null,
  };
  render() {
    const { account, network, accountBalance } = this.props;
    const { genericError } = this.state;
    return (
      <Box
        style={{
          paddingBottom: !network.isCorrectNetwork ? "8em" : "0"
        }}
      >
        <div>
          <header>
            <h1>Pragma</h1>
            <LandingForm />
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
          </div>
        </div>
      </Box>
    );
  }
}

export default Landing;
