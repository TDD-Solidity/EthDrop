// import Web3 from "web3";
import { IGroupData } from "../../models/group-data";
// import getWeb3 from "../web3/getWeb3";
// import EthDropCore from "../../contracts/EthDropCore.json";
// const Web3 = require("web3");

let connected = false;

export const getGroupsData = async (): Promise<any> => {
    
    // await ethEnabled();
    
    return Promise.resolve('foo') 
}

async function ethEnabled () {

    // if ((window as any).ethereum) {
    //     await (window as any).send('eth_requestAccounts');
    //     (window as any).web3 = new Web3((window as any).ethereum);
        
    //     connected = true;

    //     return true;
    // }
    // return false;
}


    // return async getBlockNumber() {
    //     console.log('Init web3')
    //     const web3 = new (window as any).Web3('https://cloudflare-eth.com')
    //     const currentBlockNumber = await web3.eth.getBlockNumber()

    //     return new Promise(async (resolve, reject) => {

    //         // resolve({
    //         //     data: [{
    //         //         id: Math.floor(Math.random() * 10000),
    //         //         groupName: 'groupName',
    //         //         welcomeMessage: 'welcomeMessage',
    //         //         groupImage: 'groupImage'
    //         //     }],
    //         // });

    //         try {

    //             console.log((window as any).ethereum);
    //             console.log((window as any).web3);

    //             if ((window as any).ethereum) {

    //                 console.log('ethereum: ', (window as any).ethereum)
    //                 const web3 = new Web3((window as any).ethereum);
    //                 try {
    //             //         // Request account access if needed
    //                     await (window as any).ethereum.enable();
    //             //         // Accounts now exposed
    //             //         // resolve(web3);

    //                     await callContractGetGroupsData(web3);

    //                 } catch (error) {

    //                     console.log('error enabling ethereum: ', error)
    //                     reject(error);
    //                 }
    //             }
    //             // Legacy dapp browsers...
    //             // else if ((window as any).web3) {
    //             //     // Use Mist/MetaMask's provider.
    //             //     ;
    //             //     console.log("Injected web3 detected.");
    //             //     // resolve((window as any).web3);

    //             //     await callContractGetGroupsData((window as any).web3);
    //             // }
    //             // // Fallback to localhost; use dev console port by default...
    //             // else {
    //             //     const provider = new Web3.providers.HttpProvider(
    //             //         "http://127.0.0.1:8545"
    //             //     );
    //             //     const web3 = new Web3(provider);
    //             //     console.log("No web3 instance injected, using Local web3.");
    //             //     // resolve(web3);

    //             //     await callContractGetGroupsData(web3);

    //             // }
    //             // // Get network provider and web3 instance.
    //             // const web3: Web3 = await getWeb3();

    //             // const currentNetwork = await web3.eth.net.getNetworkType()

    //             // console.log('currentNetwork: ', currentNetwork)


    //         }
    //         catch (err) {
    //             console.log('error happened in web3 service: ', err)
    //         }




    //         // resolve([{
    //         //         id: Math.floor(Math.random() * 10000),
    //         //         groupName: 'groupName',
    //         //         welcomeMessage: 'welcomeMessage',
    //         //         groupImage: 'groupImage'
    //         //     }]);

    //     });

    // }

    // async function callContractGetGroupsData(web3: Web3) {

    //     // const networkId = await web3.eth.net.getId();

    //     // console.log('network is: ', networkId);

    //     // const deployedNetwork = EthDropCore.networks[networkId];
    //     // console.log('address: ', deployedNetwork.address);

    //     // const ethDropCoreInstance = new web3.eth.Contract(
    //     //     (EthDropCore as any).abi,
    //     //     deployedNetwork && deployedNetwork.address,
    //     // );


    //     // const groupIds = await this.state.ethDropCoreInstance.methods.getGroupIds().call({ from: this.state.accounts[0] });
    //     // console.log('groupIds: ', groupIds)
    //     // this.setState({ groupIds });

    //     // const groupNames = await this.state.ethDropCoreInstance.methods.getGroupNames().call({ from: this.state.accounts[0] });
    //     // console.log('groupNames: ', groupNames)
    //     // this.setState({ groupNames });

    //     // return groupNames
    //     // const groupsData = await ethDropCoreInstance.methods.createNewGroup(this.state.newGroupInputValue2).send({ from: this.state.accounts[0] });

    //     // console.log('got groups! ', groupsData);

    //     // return groupsData;

    //     // console.log('created Group! ', createdGroup)

    //     // this.setState({ createdGroup, newGroupInputValue2: '', createGroupErrorToDisplay: '' });


