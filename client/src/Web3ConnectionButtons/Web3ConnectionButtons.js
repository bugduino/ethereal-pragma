import React, { useEffect } from 'react'
import { useWeb3Context, Web3Consumer } from 'web3-react'
import { MetaMaskButton } from 'rimble-ui';
import { Button } from 'rimble-ui'
import connectors from '../App/connectors';

export default function Web3ConnectionButtons() {
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
            key={connectorName}
            disabled={context.connectorName === connectorName}
            size="large"
            onClick={async () => await setConnector(connectorName)}>
            Connect with MetaMask
          </MetaMaskButton.outline>
        );
      default:
        return (
          <Button
            mb={3} size="large"
            key={connectorName}
            disabled={context.connectorName === connectorName}
            onClick={async () => await setConnector(connectorName)}
          >
            Activate {connectorName}
          </Button>
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
        <button onClick={() => context.unsetConnector()}>
          {context.active ? "Deactivate Connector" : "Reset"}
        </button>
      )}
    </div>
  );
}
