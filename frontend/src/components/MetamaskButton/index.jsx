import React, { useContext } from "react";
import { MetamaskContext } from "context/MetamaskProvider";
import { ApiOutlined } from "@ant-design/icons";
import { WalletOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { shortenAddress } from "utils/utils";

const MetamaskButton = ({ className }) => {
  const { connectWallet, currentAccount } = useContext(MetamaskContext);
  return (
    <div>
      {currentAccount === "" ? (
        <Button
          className={className}
          type="primary"
          style={{ backgroundColor: "green" }}
          shape="round"
          icon={<ApiOutlined />}
          onClick={connectWallet}
        >
          Connect to Metamask
        </Button>
      ) : (
        <Button
          className={className}
          type="ghost"
          shape="round"
          icon={<WalletOutlined />}
        >
          Wallet: {shortenAddress(currentAccount)}
        </Button>
      )}
    </div>
  );
};

export default MetamaskButton;
