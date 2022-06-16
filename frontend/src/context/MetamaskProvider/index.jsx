import * as config from "utils/config.js";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export const MetamaskContext = React.createContext();

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum, "any");

export const MetamaskProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentUtilityBalance, setCurrentUtilityBalance] = useState(0);
  const [utilityTokenSymbol, setUtilityTokenSymbol] = useState("");

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

  const getCrowdsaleContract = () => {
    return getContract(
      config.contract.crowdsaleContract.address,
      config.contract.crowdsaleContract.abi
    );
  };

  const getUtilityContract = () => {
    return getContract(
      config.contract.utilityContract.address,
      config.contract.utilityContract.abi
    );
  };

  ethereum.on("accountsChanged", async () => {
    checkWalletConnected();
  });

  ethereum.on("chainChanged", async () => {
    checkWalletConnected();
  });

  const assertMetamask = () => {
    if (!ethereum) {
      throw Error("Metamask extension not found");
    }
  };

  const resetData = () => {
    setCurrentAccount("");
    setCurrentBalance(0);
    setCurrentUtilityBalance(0);
    setUtilityTokenSymbol("");
  };

  const getListAccount = async () => {
    const accounts = await ethereum.request({
      method: "eth_accounts",
    });
    return accounts;
  };

  const checkWalletConnected = async () => {
    try {
      assertMetamask();
      resetData();

      const accounts = await getListAccount();
      if (!accounts.length) return;

      const account = accounts[0];
      await setCurrentAccount(account);
      updateBalance(account);
      updateUtilityBalance(account);
      updateUtilitySymbol();
    } catch (err) {
      console.log(err);
    }
  };

  const updateUtilityBalance = async (account) => {
    try {
      const utilityContract = getUtilityContract();
      const utilityBalance = await utilityContract.balanceOf(account);
      setCurrentUtilityBalance(ethers.utils.formatEther(utilityBalance));
    } catch (err) {
      console.log(err);
    }
  };

  const updateBalance = async (account) => {
    try {
      const balance = await provider.getBalance(account);
      setCurrentBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      console.log(err);
    }
  };

  const updateUtilitySymbol = async () => {
    try {
      const utilityContract = getUtilityContract();
      const symbol = await utilityContract.symbol();
      setUtilityTokenSymbol(symbol);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    await ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedNetwork = config.blockchain.ethereum.rinkeby_testnet;
    if (ethereum.networkVersion !== selectedNetwork.chainId) {
      try {
        await switchNetwork(selectedNetwork);
      } catch (err) {
        if (err.code === 4902) await addNetwork(selectedNetwork);
      }
    }

    await checkWalletConnected();
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
    checkWalletConnected();
    updateUtilitySymbol();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        connectWallet,
        switchNetwork,
        currentAccount,
        currentBalance,
        currentUtilityBalance,
        utilityTokenSymbol,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
