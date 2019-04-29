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
  PublicAddress,
  QR,
  Box,
} from "rimble-ui";
import NetworkOverview from "./NetworkOverview";
import theme from "../../theme";
import Web3ConnectionButtons from "../../Web3ConnectionButtons/Web3ConnectionButtons";

class GenericModal extends React.Component {
  render() {
    const { account, accountBalance, network } = this.props;
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
                  <NetworkOverview network={network} />
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

              <Heading.h2>Account overview</Heading.h2>

              <Text my={3} fontSize="2em">
                {accountBalance} ETH
              </Text>

              {account &&
                <div>
                  <QR value={account} />
                  <PublicAddress address={account} />
                </div>
              }
            </Flex>
          </Flex>
        </Card>
      </Modal>
    );
  }
}

export default GenericModal;
