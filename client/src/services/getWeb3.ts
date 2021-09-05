import Web3 from "web3";

let web3: Web3;
// declare var window: Window & { ethereum: any }

export function getWeb3(): Promise<Web3> {
  return new Promise(async (resolve, reject) => {

    if (web3)
      resolve(web3);

    // Wait for loading completion to avoid race conditions with web3 injection timing. (not needed anymore?)
    // window.addEventListener("load", async () => {
    // window.removeEventListener('load', () => {});

    // Modern dapp browsers...
    if ((window as any).ethereum) {
      web3 = new Web3((window as any).ethereum);
      try {
        console.log('window.ethereum enabling...')
        // Request account access if needed
        await (window as any).ethereum.enable();

        console.log('window.ethereum enabled!')
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if ((window as any).web3) {
      // Use Mist/MetaMask's provider.
      const web3 = (window as any).web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:8545"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
    // });
  });
}