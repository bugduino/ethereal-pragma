import React, { Component } from 'react';
import { Box, Heading } from 'rimble-ui'
import styles from './Landing.module.scss';
import LandingForm from '../LandingForm/LandingForm';

class Landing extends Component {
  state = {
    contract: null,
    genericError: null,
  };
  render() {
    const { network } = this.props;
    const { genericError } = this.state;
    return (
      <Box
        style={{
          paddingBottom: !network.isCorrectNetwork ? "8em" : "0"
        }}
      >
        <div>
          <header className={[styles.header]}>
            <Box width={"50em"} mx={"auto"} px={4}>
              <Heading.h1 textAlign="center">Pragma</Heading.h1>
            </Box>
            <LandingForm />
            {genericError &&
              <p>{genericError}</p>
            }
          </header>
        </div>
      </Box>
    );
  }
}

export default Landing;
