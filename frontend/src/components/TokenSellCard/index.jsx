import React, { useState } from "react";
import { Button, Select, InputNumber } from "antd";
import MetamaskButton from "components/MetamaskButton";
import { capitalizeFirstLetter } from "utils/utils";

const { Option } = Select;
const sellTypeMenu = ["listing", "crowdfunding", "bidding", "swap"];

const TokenSellCard = (props) => {
  const className = props.className || "";
  const balance = props.balance || 0;

  const [sellType, setSellType] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e);
  };

  const handleSellTypeChange = (e) => {
    setSellType(e);
  };

  return (
    <div className={`${className} p-5 bg-white h-full w-full rounded-xl`}>
      <h1>Selling form</h1>
      <hr className="m-2" />

      <div className="grid grid-cols-2 gap-x-2">
        <div>
          <h3>Sell type</h3>
          <Select
            value={sellType}
            style={{ width: 120 }}
            onChange={handleSellTypeChange}
          >
            {sellTypeMenu.map((item) => (
              <Option key={item} value={item}>
                {capitalizeFirstLetter(item)}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <h3>Amount</h3>
          <InputNumber
            style={{ width: "100%" }}
            value={amount}
            min={0}
            max={balance}
            onChange={handleAmountChange}
            size="large"
            placeholder="Amount"
          />
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
