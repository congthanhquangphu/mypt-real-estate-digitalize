import React, { useContext } from "react";
import { Pagination } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import PendingEstateItem from "components/PedingEstateItem";

const PendingEstateCard = ({ className }) => {
  const { currentAccount } = useContext(MetamaskContext);

  return (
    <div
      className={`bg-white min-h-full flex flex-col rounded-xl w-fit p-4 ${className}`}
    >
      <div>
        <h1>Your pending real estates</h1>
        <hr className="m-2" />
      </div>
      <div className="flex flex-wrap h-[90%]">
        {currentAccount === "" ? (
          <div className="flex flex-col items-center justify-center w-full">
            <h2>Please connect your wallet to view estates</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 w-full h-full place-items-center">
            <PendingEstateItem className="m-1" title="Hello" />
            <PendingEstateItem className="m-1" title="Hello" />
            <PendingEstateItem className="m-1" title="Hello" />
            <PendingEstateItem className="m-1" title="Hello" />
            <PendingEstateItem className="m-1" title="Hello" />
            <PendingEstateItem className="m-1" title="Hello" />
          </div>
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

export default PendingEstateCard;
