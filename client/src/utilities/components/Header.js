import React from "react";
import { Box, Flex, Button, Text, Icon } from "rimble-ui";
import NetworkIndicator from "@rimble/network-indicator"
import AccountOverview from "./AccountOverview";
import GenericModal from "./GenericModal";

class Header extends React.Component {
  state = {
    isOpen: false
  }

  toggleModal = () => {
    this.setState(state => ({...state, isOpen: !state.isOpen}));
  }

  render() {
    return (
      <Box style={{
        'position': 'fixed',
        'left': '0',
        'right': '0',
        }}
      >
        <Flex alignItems={"center"} bg={"white"}>
          <Box ml={4} width={2 / 12} alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Icon name="AccountBalance" fontSize={3} color="primary" />
              <Text fontSize={3} fontFamily={`"Roboto", "Helvetica", "Arial", sans-serif`}>
                Pragma
              </Text>
            </Flex>
          </Box>
          <Box width={10 /12} justifyContent="flex-end">
            <Flex alignItems={"center"} justifyContent="flex-end">
              <Box mr={4}>
                <NetworkIndicator currentNetwork={this.props.network.current.id} requiredNetwork={this.props.network.required.id} />
              </Box>

              {this.props.account ? (
                <AccountOverview
                  account={this.props.account}
                  accountBalanceLow={this.props.accountBalanceLow}
                  accountBalance={this.props.accountBalance}
                  toggleModal={this.toggleModal}
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

          <GenericModal
            account={this.props.account}
            accountBalance={this.props.accountBalance}
            isOpen={this.state.isOpen}
            closeModal={this.toggleModal}
            network={this.props.network.current} />
        </Flex>
      </Box>
    );
  }
}

export default Header;
