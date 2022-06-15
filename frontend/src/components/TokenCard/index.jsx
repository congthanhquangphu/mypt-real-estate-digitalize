import { MetamaskContext } from "context/MetamaskProvider";
import { Pagination } from "antd";
import React, { useContext } from "react";

const TokenCard = () => {
  const { currentAccount } = useContext(MetamaskContext);

  return (
    <div className="bg-white min-h-full flex flex-col rounded-xl w-full p-4">
      <div>
        <h1>Your tokens</h1>
        <hr className="m-2" />
      </div>
      <div className=" flex flex-wrap h-[90%] justify-center">
        {currentAccount === "" ? (
          <div className="flex flex-col items-center justify-center">
            <h2>Please connect your wallet to view tokens</h2>
          </div>
        ) : (
          <h3>Content</h3>
        )}
      </div>
      <div className="p-2 m-2 rounded-xl bg-white">
        <Pagination
          className="flex flex-row justify-center m-2"
          defaultCurrent={1}
        />
      </div>
    </div>
  );
};

export default TokenCard;
