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

  const getCrowdsaleContract = (isView = true) => {
    return getContract(
      config.contract.crowdsaleContract.address,
      config.contract.crowdsaleContract.abi,
      isView
    );
  };

  const getUtilityContract = (isView = true) => {
    return getContract(
      config.contract.utilityContract.address,
      config.contract.utilityContract.abi,
      isView
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
      setCurrentAccount(account);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUtilityBalance = async () => {
    try {
      const utilityContract = getUtilityContract();
      const utilityBalance = await utilityContract.balanceOf(currentAccount);
      setCurrentUtilityBalance(ethers.utils.formatEther(utilityBalance));
    } catch (err) {
      console.log(err);
    }
  };

  const updateBalance = async () => {
    try {
      const balance = await provider.getBalance(currentAccount);
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

  const getUtilityPrice = async (amount) => {
    try {
      const rate = await getUtilityRate();
      const price = (amount * 1.0) / rate;
      return price;
    } catch (err) {
      console.log(err);
    }
  };

  const buyUtilityToken = async (receiver, deposit) => {
    try {
      const crowdsaleContract = await getCrowdsaleContract(false);
      const transaction = await crowdsaleContract.buyTokens(receiver, {
        value: ethers.utils.parseEther(deposit.toString()),
      });
      return await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const withdrawUtilityToken = async (receiver) => {
    try {
      const crowdsaleContract = await getCrowdsaleContract(false);
      const transaction = await crowdsaleContract.withdrawTokens(receiver);
      return await transaction.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const getUtilityRate = async () => {
    try {
      const crowdsaleContract = getCrowdsaleContract();
      const rate = await crowdsaleContract.rate();
      return ethers.utils.formatEther(rate) * Math.pow(10, 18);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    await ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedNetwork = config.blockchain.aurora.testnet;
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

  useEffect(() => {
    updateBalance();
    updateUtilityBalance();
    updateUtilitySymbol();
  }, [currentAccount]);

  return (
    <MetamaskContext.Provider
      value={{
        connectWallet,
        switchNetwork,
        buyUtilityToken,
        getUtilityPrice,
        getUtilityRate,
        withdrawUtilityToken,
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
