import React, { useContext } from "react";
import { MetamaskContext } from "context/MetmaskContext";
import { WalletOutlined, ApiOutlined } from "@ant-design/icons";
import { Button } from "antd";
import utils from "utils/utils";

const MetamaskButton = (props) => {
  const className = props.className || "";
  const { connectWallet, currentAccount } = useContext(MetamaskContext);
  return (
    <div>
      {currentAccount === "" ? (
        <Button
          className={className}
          type="primary"
          style={{ backgroundColor: "green" }}
          shape="round"
          size="large"
          icon={<ApiOutlined />}
          onClick={connectWallet}
        >
          Connect to Metamask
        </Button>
      ) : (
        <Button
          className={className}
          style={{ backgroundColor: "green" }}
          type="primary"
          size="large"
          shape="round"
          icon={<WalletOutlined />}
        >
          Wallet: {utils.shortenAddress(currentAccount)}
        </Button>
      )}
    </div>
  );
};

export default MetamaskButton;
