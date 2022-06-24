import config from "utils/config.js";
import { ethers } from "ethers";
import React, { useContext } from "react";
import { MetamaskContext } from "context/MetmaskContext";

export const SecurityTokenContext = React.createContext();

export const SecurityTokenProvider = ({ children }) => {
  const { getContract, currentAccount } = useContext(MetamaskContext);

  const getSecurityContract = (isView = true) => {
    const contract = config.contract.SECURITY_TOKEN_CONTRACT;
    return getContract(contract.address, contract.abi, isView);
  };

  const getSecurityOwnedToken = async (limit, offset) => {
    const tokens = await getSecurityOwnedTokenIds();
    if (offset >= tokens.length) {
      throw Error("Index out of boundary");
    }
    return tokens.slice(offset, Math.min(tokens.length, offset + limit));
  };

  const getSecurityOwnedTokenCount = async () => {
    const tokens = await getSecurityOwnedTokenIds();
    return tokens.length;
  };

  const getSecurityOwnedTokenIds = async () => {
    const ids = await getSecurityTokenIds();
    const balances = await getSecurityTokenBatch(ids);
    const result = balances
      .map((balance, index) => {
        return {
          tokenId: ids[index],
          balance,
        };
      })
      .filter((token) => token.balance > 0);
    return result;
  };

  const getSecurityTokenIds = async () => {
    try {
      const securityContract = getSecurityContract();
      const ids = await securityContract.getIds();
      const result = ids.map(
        (id) => ethers.utils.formatEther(id) * Math.pow(10, 18)
      );
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const getSecurityTokenBatch = async (ids) => {
    try {
      const securityContract = getSecurityContract();
      const addresses = ids.map((_) => currentAccount);
      const balances = await securityContract.balanceOfBatch(addresses, ids);
      const result = balances.map((balance) =>
        parseInt(ethers.utils.formatEther(balance) * Math.pow(10, 18))
      );
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  const mintToken = async (tokenId, uri, beneficiary, totalSupply) => {
    try {
      const securityContract = getSecurityContract(false);
      const transaction = await securityContract.mintToken(
        tokenId,
        uri,
        beneficiary,
        totalSupply
      );
      return await transaction.wait();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SecurityTokenContext.Provider
      value={{
        getSecurityOwnedTokenCount,
        getSecurityTokenIds,
        mintToken,
        getSecurityOwnedToken,
        getSecurityTokenBatch,
      }}
    >
      {children}
    </SecurityTokenContext.Provider>
  );
};
