import React from "react";
import { Box, Flex, Button, Heading } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator"
import AccountOverview from "./AccountOverview";

class Header extends React.Component {
  render() {
    return (
      <Box>
        <Flex alignItems={"center"} justifyContent="flex-end" bg={"white"}>
          <Box mr={4}>
            <NetworkIndicator currentNetwork={this.props.network.current.id} requiredNetwork={this.props.network.required.id} />
          </Box>

          {this.props.account && this.props.accountValidated ? (
            <AccountOverview
              account={this.props.account}
              accountBalanceLow={this.props.accountBalanceLow}
              accountBalance={this.props.accountBalance}
            />
          ) : (
            <Button
              m={3}
              onClick={this.props.connectAndValidateAccount}
              size="small"
            >
              Connect
            </Button>
          )}
        </Flex>
      </Box>
    );
  }
}

export default Header;
