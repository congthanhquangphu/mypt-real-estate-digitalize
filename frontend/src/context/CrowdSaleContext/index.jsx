import config from "utils/config.js";
import { ethers } from "ethers";
import React, { useContext } from "react";
import { MetamaskContext } from "context/MetmaskContext";

export const CrowdSaleContext = React.createContext();

export const CrowdSaleProvider = ({ children }) => {
  const { getContract } = useContext(MetamaskContext);

  const getCrowdsaleContract = (isView = true) => {
    const contract = config.contract.CROWDSALE_CONTRACT;
    return getContract(contract.address, contract.abi, isView);
  };

  const getUtilityPrice = async (amount) => {
    try {
      const rate = await getUtilityRate();
      const price = (amount * 1.0) / rate;
      return price;
    } catch (err) {
      console.error(err);
      throw err;
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
      console.error(err);
      throw err;
    }
  };

  const withdrawUtilityToken = async (receiver) => {
    try {
      const crowdsaleContract = await getCrowdsaleContract(false);
      const transaction = await crowdsaleContract.withdrawTokens(receiver);
      return await transaction.wait();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getUtilityRate = async () => {
    try {
      const crowdsaleContract = getCrowdsaleContract();
      const rate = await crowdsaleContract.rate();
      return ethers.utils.formatEther(rate) * Math.pow(10, 18);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CrowdSaleContext.Provider
      value={{
        buyUtilityToken,
        getUtilityPrice,
        getUtilityRate,
        withdrawUtilityToken,
      }}
    >
      {children}
    </CrowdSaleContext.Provider>
  );
};
