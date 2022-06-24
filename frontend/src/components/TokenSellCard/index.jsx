import React, { useState } from "react";
import { Select, InputNumber } from "antd";
import utils from "utils/utils";

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
                {utils.capitalizeFirstLetter(item)}
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
    </div>
  );
};

export default TokenSellCard;
