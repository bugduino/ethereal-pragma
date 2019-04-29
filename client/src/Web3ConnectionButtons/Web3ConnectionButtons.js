import React from 'react'
import { useWeb3Context } from 'web3-react'
import { MetaMaskButton, OutlineButton, Image } from 'rimble-ui';
import connectors from '../App/connectors';

export default function Web3ConnectionButtons(props) {
  const context = useWeb3Context()

  if (!context.active && !context.error) {
    // loading
    console.log('context loading', context);
    // debugger;
  } else if (context.error) {
    console.log('context error', context);
    //error
  } else {
    console.log('context success', context);
    // success
  }
  const setConnector = async connectorName => {
    return await context.setConnector(connectorName)
  };
  const buttons = Object.keys(connectors).map(connectorName => {
    switch (connectorName) {
      case 'Injected':
        return (
          <MetaMaskButton.outline
            mb={3}
            fullWidth
            key={connectorName}
            disabled={context.connectorName === connectorName}
            size="large"
            onClick={async () => await setConnector(connectorName)}>
            Connect with MetaMask
          </MetaMaskButton.outline>
        );
      default:
        return (
          <OutlineButton
            fullWidth
            mb={3} size="large"
            key={connectorName}
            disabled={context.connectorName === connectorName}
            onClick={async () => await setConnector(connectorName)}
          >
            <Image
              display={'inline-block'}
              mr={'0.5rem'}
              src={`images/${connectorName.toLowerCase()}.svg`}
              alt="fortmatic"
              width={"1em"}
              height={"1em"}
            />
            Connect with {connectorName}
          </OutlineButton>
        );
    }
  });

  return (
    <div>
      {context.error && (
        <p>An error occurred, check the console for details.</p>
      )}
      {buttons}
      <br />
      {(context.active || (context.error && context.connectorName)) && (
        <OutlineButton onClick={async () => await context.unsetConnector()}>
          {context.active ? "Deactivate Connector" : "Reset"}
        </OutlineButton>
      )}
    </div>
  );
}
