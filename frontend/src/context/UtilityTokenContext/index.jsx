import config from "utils/config.js";
import { ethers } from "ethers";
import { MetamaskContext } from "context/MetmaskContext";
import React, { useEffect, useState, useContext } from "react";

export const UtilityTokenContext = React.createContext();

export const UtitlityTokenProvider = ({ children }) => {
  const { ethereum, getContract, currentAccount } = useContext(MetamaskContext);

  const [currentUtilityBalance, setCurrentUtilityBalance] = useState(0);
  const [utilityTokenSymbol, setUtilityTokenSymbol] = useState("");

  const getUtilityContract = (isView = true) => {
    const contract = config.contract.UTILITY_TOKEN_CONTRACT;
    return getContract(contract.address, contract.abi, isView);
  };

  const resetData = () => {
    setCurrentUtilityBalance(0);
    setUtilityTokenSymbol("");
  };

  const updateUtilityBalance = async () => {
    try {
      const utilityContract = getUtilityContract();
      const utilityBalance = await utilityContract.balanceOf(currentAccount);
      setCurrentUtilityBalance(ethers.utils.formatEther(utilityBalance));
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updateUtilitySymbol = async () => {
    try {
      const utilityContract = getUtilityContract();
      const symbol = await utilityContract.symbol();
      setUtilityTokenSymbol(symbol);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const refreshData = () => {
    resetData();
    updateUtilitySymbol();
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (currentAccount === "") return;
    updateUtilityBalance();
  }, [currentAccount]);

  ethereum.on("accountsChanged", async () => {
    refreshData();
  });

  ethereum.on("chainChanged", async () => {
    refreshData();
  });

  return (
    <UtilityTokenContext.Provider
      value={{
        currentUtilityBalance,
        utilityTokenSymbol,
      }}
    >
      {children}
    </UtilityTokenContext.Provider>
  );
};
