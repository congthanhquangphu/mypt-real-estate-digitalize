import * as config from "utils/config.js"

export const ethereum = window.ethereum;

export const switchNetwork = () => {
    ethereum.request({
        method: "wallet_addEthereumChain",
        params: [config.blockchain.aurora.mainnet]
    });
}

export const connectMetamask = async () => {
    if (!ethereum) {
        alert("Please install metamask extension!")
        return;
    }
    return await ethereum.send("eth_requestAccounts", []);
}

export const getAccounts = async () => {
    const accounts = await ethereum.request({
        method: 'eth_accounts',
    })
    return accounts[0]
}

export const isConnected = async () => {
    return await ethereum.isConnected();
}