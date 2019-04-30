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
            <Box width={"50em"} mx={"auto"} px={4} pb={3}>
              <Heading.h1
                style={{
                  'color': 'white'
                }}
                fontFamily={`"Roboto", "Helvetica", "Arial", sans-serif`} textAlign="center">Trustless lending made easy</Heading.h1>
              <Heading.h2
                style={{
                  'color': 'white'
                }}
                fontFamily={`"Roboto", "Helvetica", "Arial", sans-serif`} fontWeight="300" textAlign="center">Lend assets and earn passive income</Heading.h2>
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
