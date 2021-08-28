import Web3 from "web3";

declare const window: any;

let web3;

export default function getWeb3(): Promise<Web3> {

    return new Promise((resolve, reject) => {

        // console.log('^^ web3 is: ', web3)

        // if (web3)
        //     resolve(web3);

        // // Wait for loading completion to avoid race conditions with web3 injection timing.
        // window.addEventListener("load", async () => {

        //     window.removeEventListener('load', () => { });

        //     // Modern dapp browsers...
        //     if (window.ethereum) {
        //         web3 = new Web3(window.ethereum);
        //         try {
        //             // Request account access if needed
        //             await window.ethereum.enable();
        //             // Accounts now exposed
        //             resolve(web3);
        //         } catch (error) {
        //             reject(error);
        //         }
        //     }
        //     // Legacy dapp browsers...
        //     else if (window.web3) {
        //         // Use Mist/MetaMask's provider.
        //         const web3 = window.web3;
        //         console.log("Injected web3 detected.");
        //         resolve(web3);
        //     }
        //     // Fallback to localhost; use dev console port by default...
        //     else {
        //         const provider = new Web3.providers.HttpProvider(
        //             "http://127.0.0.1:8545"
        //         );
        //         const web3 = new Web3(provider);
        //         console.log("No web3 instance injected, using Local web3.");
        //         resolve(web3);
        //     }
        // });
    });
}