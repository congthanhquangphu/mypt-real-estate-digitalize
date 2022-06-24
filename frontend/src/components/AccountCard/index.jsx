import React, { useContext } from "react";
import defaultAvatar from "res/default_avatar.png";
import { MetamaskContext } from "context/MetmaskContext";
import MetamaskButton from "components/MetamaskButton";

const AccountCard = (props) => {
  const className = props.className || "";

  const {
    currentAccount,
    currentBalance,
    currentUtilityBalance,
    utilityTokenSymbol,
  } = useContext(MetamaskContext);

  return (
    <div className={`p-5 bg-white rounded-xl ${className}`}>
      <h1>User information</h1>
      <hr className="p-2" />
      <div className="flex justify-center m-2">
        <img src={defaultAvatar} alt="avatar" className="avatar" />
      </div>
      <div className="m-2">
        {!currentAccount ? (
          <MetamaskButton className="w-full" />
        ) : (
          <div>
            <b>Wallet address: </b>
            <div>{currentAccount}</div>
          </div>
        )}
      </div>
      <div className="rounded-xl p-5 w-full bg-gray-200 mt-2 text-right ">
        <h2>{currentBalance} ETH</h2>
        <h2>
          {currentUtilityBalance} {utilityTokenSymbol}
        </h2>
      </div>
    </div>
  );
};

export default AccountCard;
