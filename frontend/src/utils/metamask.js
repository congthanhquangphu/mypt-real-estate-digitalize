import config from "utils/config.js"
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum)

export const connectMetamask = async () => {
    if (!window.ethereum) {
        alert("Please install metamask extension!")
        return;
    }
    await provider.send("eth_requestAccounts", []);

}

export const getAccounts = async () => {
    const accounts = await window.ethereum.request({
        method: 'eth_accounts',
    })
    return accounts[0]
}

export const isConnected = () => {
    return window.ethereum.isConnected();
}