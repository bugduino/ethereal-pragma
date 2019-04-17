import Web3 from "web3";

const initInfuraWeb3 = (network = 'mainnet') => {
  new Promise(async (resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else {
        const provider = new Web3.providers.HttpProvider(
          `https://${network}.infura.io/v3/db0b7b205b5a4889bd6ba73641c3fd6f`
        );
        const web3 = new Web3(provider);
        resolve(web3);
      }
    });
  });
}

export default initInfuraWeb3;
