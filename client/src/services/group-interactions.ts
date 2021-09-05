import EthDropCore from '../contracts/EthDropCore.json';

import { ethers } from "ethers";
import { heardEvent_AppPaused } from '../state/actions/global-data';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

// COO Functions

async function addGroupAdmin(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function removeGroupAdmin(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

// Recipient Functions

async function registerAsRecipient(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function claimWinnings(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

// Sponsor Functions

async function updateSponsorInfo(currentEthDropCoreSignerInstance, newCfoAddress: string) {
    try {
        await currentEthDropCoreSignerInstance.setCFO(newCfoAddress);
    }
    catch (err) {
        console.log('call to updateCFO failed... ', err)
    }
}

async function contributeToPot(currentEthDropCoreSignerInstance, newCfoAddress: string) {
    try {
        await currentEthDropCoreSignerInstance.setCFO(newCfoAddress);
    }
    catch (err) {
        console.log('call to updateCFO failed... ', err)
    }
}

// Admin Functions

async function addEligibleRecipient(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function removeEligibleRecipient(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function updateSponsorAddress(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function startEventRegistration(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function closeEventRegistration(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}

async function endEvent(currentEthDropCoreSignerInstance, newCooAddress: string) {

    try {
        await currentEthDropCoreSignerInstance.setCOO(newCooAddress);
    }
    catch (err) {
        console.log('call to updateCOO failed... ', err)
    }
}



