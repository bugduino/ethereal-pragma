import React from "react";
import { Box, Flex, Button } from "rimble-ui";
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
          'position': 'absolute',
          'left': '0',
          'right': '0',
        }}>
        <Flex alignItems={"center"} justifyContent="flex-end" bg={"white"}>
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
