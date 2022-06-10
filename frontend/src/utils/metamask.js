import config from "./config"

export const connectMetamask = async () => {
    if (!window.ethereum) {
        alert("Please install metamask extension!")
        return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' })
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