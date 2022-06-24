import config from "utils/config.js";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export const MetamaskContext = React.createContext();

export const MetamaskProvider = ({ children }) => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum, "any");

  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);

  const getContract = (address, abi, isView = true) => {
    let contract;
    if (isView) {
      contract = new ethers.Contract(address, abi, provider);
    } else {
      const signer = provider.getSigner();
      contract = new ethers.Contract(address, abi, signer);
    }
    return contract;
  };

  const assertMetamask = () => {
    if (!ethereum) {
      throw Error("Metamask extension not found");
    }
  };

  const resetData = () => {
    setCurrentAccount("");
    setCurrentBalance(0);
  };

  const getListAccount = async () => {
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    return accounts;
  };

  const updateAccount = async () => {
    const accounts = await getListAccount();
    if (!accounts.length) return;

    const account = accounts[0];
    setCurrentAccount(account);
  };

  const refreshData = async () => {
    try {
      resetData();
      assertMetamask();
      updateAccount();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateBalance = async () => {
    try {
      const balance = await provider.getBalance(currentAccount);
      setCurrentBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const connectWallet = async () => {
    await ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedNetwork = config.blockchain.AURORA_TESTNET;
    if (ethereum.networkVersion !== selectedNetwork.chainId) {
      try {
        await switchNetwork(selectedNetwork);
      } catch (err) {
        if (err.code === 4902) await addNetwork(selectedNetwork);
      }
    }

    await refreshData();
  };

  const addNetwork = async (network) => {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };

  const switchNetwork = async (network) => {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainId }],
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (currentAccount === "") return;
    updateBalance();
  }, [currentAccount]);

  ethereum.on("accountsChanged", async () => {
    refreshData();
  });

  ethereum.on("chainChanged", async () => {
    refreshData();
  });

  return (
    <MetamaskContext.Provider
      value={{
        connectWallet,
        switchNetwork,
        currentAccount,
        currentBalance,
        ethereum,
        provider,
        getContract,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
