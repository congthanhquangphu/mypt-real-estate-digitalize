import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Input, message, Upload } from "antd";
import MetamaskButton from "components/MetamaskButton";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const sellTypeMenu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: "Listing",
        key: "listing",
      },
      {
        label: "Crowdfunding",
        key: "crowdfunding",
      },
      {
        label: "Bidding",
        key: "bidding",
      },
      {
        label: "Swap",
        key: "swap",
      },
    ]}
  />
);

const tokenMenu = (
  <Menu
    items={[
      {
        key: "re01",
        label: "RE01",
      },
    ]}
  />
);

const TokenSellCard = (props) => {
  return (
    <div className="p-5 bg-white w-full rounded-xl">
      <h1>Selling form</h1>
      <hr className="m-2" />
      <div className="m-2"></div>
      <div className="grid grid-cols-3 gap-x-2">
        <div>
          <h3>Sell type</h3>
          <Dropdown overlay={sellTypeMenu}>
            <Button>
              <Space>
                Choose sell type
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <h3>Token</h3>
          <Dropdown overlay={tokenMenu}>
            <Button>
              <Space>
                Choose token
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div>
          <h3>Amount</h3>
          <Input size="large" placeholder="Amount" />
        </div>
      </div>
      <MetamaskButton className="m-2 w-full" />
      <Button shape="round" type="primary" className="w-full m-2" size="large">
        Submit
      </Button>
    </div>
  );
};

export default TokenSellCard;
