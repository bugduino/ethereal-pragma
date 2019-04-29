import React from "react";
import {
  Card,
  Heading,
  Text,
  Icon,
  TextButton,
  Modal,
  Flex,
  Image,
  Box,
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "../../theme";
import Web3ConnectionButtons from "../../Web3ConnectionButtons/Web3ConnectionButtons";

class ConnectionModal extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <Card p={5} maxWidth={"960px"}>
          <TextButton
            icononly
            icon={"Close"}
            color={"moon-gray"}
            position={"absolute"}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={this.props.closeModal}
          />

          <Flex justifyContent={"center"} alignContent={"stretch"}>
            <Box width={"400px"} flex={"1 1 auto"}>
              <Flex flexDirection={"column"} alignContent={"center"}>
                <Box>
                  <Text color={theme.colors.primary} caps>
                    Current Network
                  </Text>
                  <NetworkOverview network={this.props.currentNetwork} />
                </Box>

                <Box my={4}>
                  <Text color={theme.colors.primary} caps>
                    New to Pragma?
                  </Text>
                  <Text fontWeight={3} mt={3} mb={2}>
                    What is connecting?
                  </Text>
                  <Text>Connecting lets you use Pragma</Text>
                  <Text>
                    Explore through your Ethereum account (the long cod that
                    starts with 0x).
                  </Text>
                </Box>

                <Text fontWeight={3}>You need to be connected to:</Text>
                <ul>
                  <li>Lend ETH/ERC20 tokens</li>
                  <li>Get ETH/ERC20 tokens plus interest back</li>
                </ul>
              </Flex>
            </Box>

            <Flex borderRight={1} borderColor={"#999"} mx={3}>
              <Text />
            </Flex>

            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              p={3}
              flexShrink={"1"}
            >
              <Flex justifyContent={"center"} my={4}>
                <Icon name="Link" color="#666" size="40" />
              </Flex>

              <Heading.h2>How would you like to connect?</Heading.h2>

              <Text my={3}>
                Make sure you've set up MetaMask or your mobile wallet before
                you continue.
              </Text>

              <Web3ConnectionButtons />

              <Flex mt={3} mx={4} alignItems="center">
                <Box mr={3}>
                  <Image
                    src="images/phone.png"
                    alt="mobile phone"
                    width={"60px"}
                    height={"92px"}
                  />
                </Box>

                <Flex flexDirection={"column"}>
                  <Text fontWeight={3} mb={2}>
                    Connect with a mobile app
                  </Text>
                  <Text>
                    You can connect from mobile browser wallets like Cipher,
                    Status or Coinbase wallet.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default ConnectionModal;
