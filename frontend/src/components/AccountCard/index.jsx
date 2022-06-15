import React, { useContext } from "react";
import defaultAvatar from "res/default_avatar.png";
import { MetamaskContext } from "context/MetamaskProvider";
import MetamaskButton from "components/MetamaskButton";

const AccountCard = (props) => {
  const { currentAccount, currentBalance } =
    useContext(MetamaskContext);

  return (
    <div className="m-2 p-5 bg-white rounded-xl">
      <h1>User information</h1>
      <hr className="p-2" />
      <div className="flex justify-center m-2">
        <img src={defaultAvatar} alt="avatar" className="avatar" />
      </div>
      <div className="m-2">
        {!currentAccount ? (
          <MetamaskButton className="w-full"/>
        ) : (
          <div>
            <b>Wallet address: </b>
            <div>{currentAccount}</div>
          </div>
        )}
      </div>
      <div className="rounded-xl p-5 w-full bg-gray-200 mt-2 text-right">
        <h2>{currentBalance} ETH</h2>
        <h2>{0} REUT</h2>
      </div>
    </div>
  );
};

export default AccountCard;
