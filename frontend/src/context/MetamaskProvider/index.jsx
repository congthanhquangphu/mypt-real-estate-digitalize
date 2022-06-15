import * as config from "utils/config.js";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

export const MetamaskContext = React.createContext();

const { ethereum } = window;

const getContract = (address, abi) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const crowdsaleContract = new ethers.Contract(address, abi, signer);
  return crowdsaleContract;
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

export const MetamaskProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);

  const assertMetamask = () => {
    if (!ethereum) {
      throw Error("Metamask extension not found");
    }
  };

  const checkWalletConnected = async () => {
    try {
      assertMetamask();
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      if (!accounts.length) return;

      let account = accounts[0];
      setCurrentAccount(account);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(account);
      setCurrentBalance(ethers.utils.formatEther(balance));
    } catch (err) {
      alert(err);
    }
  };

  const connectWallet = async () => {
    await ethereum.request({
      method: "eth_requestAccounts",
    });
    await checkWalletConnected();
  };

  const switchNetwork = (network) => {
    ethereum.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
  };

  useEffect(() => {
    checkWalletConnected();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        connectWallet,
        switchNetwork,
        currentAccount,
        currentBalance,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};