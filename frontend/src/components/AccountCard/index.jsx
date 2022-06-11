import React from "react";
import defaultAvatar from "res/default_avatar.png";

const AccountCard = (props) => {
  const fullname = props.fullname || "";
  const email = props.email || "";
  const wallet = props.wallet || "";
  const coinETH = props.coinETH || 0;
  const coinNPT = props.coinNPT || 0;

  return (
    <div className="m-2 p-5 h-full bg-white rounded-xl">
      <h1>User information</h1>
      <hr className="p-2" />
      <div className="flex justify-center m-2">
        <img src={defaultAvatar} alt="avatar" className="avatar" />
      </div>
      <div className="flex justify-center m-2">
        <h1>{fullname}</h1>
      </div>
      <div className="m-2">
        <div>
          <div>
            <span>
              <b>Email: </b> {email}
            </span>
          </div>
        </div>
        <b>Wallet address: </b>
        <div>{wallet}</div>
      </div>
      <div className="rounded-xl p-5 w-full bg-gray-200 grid grid-cols-2 mt-2 text-right">
        <i />
        <h2>{coinETH} ETH</h2>
        <i />
        <h2>{coinNPT} NPT</h2>
      </div>
    </div>
  );
};

export default AccountCard;
