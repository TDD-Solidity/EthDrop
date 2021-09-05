import EthDropCore from '../contracts/EthDropCore.json';

import { ethers } from "ethers";
import { heardEvent_AppPaused } from '../state/actions/global-data';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export interface IInitializeWeb3Success {
    accounts: string[],
    etherBalance: string,
    networkId: number,
    ethDropCoreReadInstance: any,
    ethDropCoreSignerInstance: any,
    globalData: GlobalDataFromContract
}

export interface IInitializeWeb3Error {
    error: any;
}

// "global" data means not relating to a specific group 
export interface GlobalDataFromContract {

    amICEO: boolean;
    amICOO: boolean;
    amICFO: boolean;

    isPaused: boolean;

    groupIds: number[];
    groupNames: string[];
}

// let currentEthDropCoreSignerInstance;

export const getGlobalData = (reduxDispatch): Promise<IInitializeWeb3Success | IInitializeWeb3Error> => {

    return new Promise(async (resolve, reject) => {

        (window as any).ethereum.enable();

        const provider = new ethers.providers.Web3Provider((window as any).ethereum)

        const signer = provider.getSigner()

        console.log({ signer })

        const signerAddress = await signer.getAddress();
        console.log({ signerAddress })

        const blockNum = await provider.getBlockNumber()
        console.log({ blockNum })

        const balance = await provider.getBalance(signerAddress)
        const etherBalance = ethers.utils.formatEther(balance)
        console.log({ balance })
        console.log({ etherBalance })

        const networkId = await provider.getNetwork()

        console.log(JSON.stringify(networkId))

        const HARDCODED_NETWORK_ID = 5777

        const deployedNetwork = EthDropCore.networks[HARDCODED_NETWORK_ID];

        console.log(deployedNetwork && deployedNetwork.address)

        const ethDropCoreReadInstance = new ethers.Contract(
            deployedNetwork && deployedNetwork.address,
            (EthDropCore as any).abi,
            provider
        )

        const ethDropCoreSignerInstance = ethDropCoreReadInstance.connect(signer);
        // currentEthDropCoreSignerInstance = ethDropCoreSignerInstance;

        console.log({ ethDropCoreReadInstance })

        // const groupNames = await ethDropCoreReadInstance.getGroupNames();
        // console.log('groupNames: ', groupNames);

        // const groupIds = await ethDropCoreReadInstance.getGroupIds();
        // console.log('groupIds: ', groupIds);

        const globalData: GlobalDataFromContract = await ethDropCoreReadInstance.getGlobalData();
        console.log('globalData: ', globalData);

        // // TODO setup event listeners
        startGlobalDataEventListeners(ethDropCoreReadInstance, reduxDispatch);

        resolve({
            accounts: [signerAddress],
            etherBalance,
            networkId: HARDCODED_NETWORK_ID,
            ethDropCoreReadInstance,
            ethDropCoreSignerInstance,
            globalData
        });

        resolve({} as IInitializeWeb3Success) // for debugging

    });

}

export function startGlobalDataEventListeners(ethDropCoreReadInstance: any, reduxDispatch) {

    ethDropCoreReadInstance.on("AppPaused", (isPaused) => reduxDispatch(heardEvent_AppPaused(isPaused)));

}

async function updateCOO(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try{
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch(err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function updateCFO(currentEthDropCoreSignerInstance, newCfoAddress: string) {
    try{
        await currentEthDropCoreSignerInstance.setCFO(newCfoAddress);
    }
    catch(err) {
        console.log('call to updateCFO failed... ', err)
    }
}

async function pauseApp(currentEthDropCoreSignerInstance) {
    try{
        await currentEthDropCoreSignerInstance.pause();
    }
    catch(err) {
        console.log('call to pause failed... ', err)
    }
}

async function unpauseApp(currentEthDropCoreSignerInstance) {
    try{
        await currentEthDropCoreSignerInstance.unpause();
    }
    catch(err) {
        console.log('call to unpause failed... ', err)
    }
}