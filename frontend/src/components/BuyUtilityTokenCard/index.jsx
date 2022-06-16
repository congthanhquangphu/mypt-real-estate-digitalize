import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";

const BuyUtilityTokenCard = ({ className }) => {
  const { utilityTokenSymbol } = useContext(MetamaskContext);

  const submitForm = (data) => {
    console.log(data)
  }

  return (
    <div className={`p-4 bg-white rounded-xl ${className}`}>
      <Form onFinish={submitForm}>
        <h1>Buy utility token</h1>
        <hr className="my-2" />
        <div className="w-full">
          <div className="my-2">
            <h3>Receiver address</h3>
            <Form.Item name="receiver">
              <Input size="large" placeholder="0x23fe..." />
            </Form.Item>
          </div>
          <div className="my-2">
            <h3>Amount</h3>
            <Form.Item name="amount">
              <InputNumber
                addonAfter={utilityTokenSymbol}
                style={{ width: "100%" }}
                size="large"
                placeholder="0"
              />
            </Form.Item>
          </div>
          <div className="my-2">
            <Form.Item>
              <Button
                type="primary"
                size="large"
                shape="round"
                className="center w-full"
                htmlType="submit"
              >
                Buy
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BuyUtilityTokenCard;
