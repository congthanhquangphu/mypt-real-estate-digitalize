import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import { useForm } from "antd/lib/form/Form";
import { existEmpty } from "utils/utils";
import "ethers";

const BuyUtilityTokenCard = ({ className }) => {
  const {
    buyUtilityToken,
    utilityTokenSymbol,
    getUtilityRate,
    currentAccount,
    getUtilityPrice,
    withdrawUtilityToken,
  } = useContext(MetamaskContext);
  const [form] = useForm();
  const [estimatePrice, setEstimatePrice] = useState(0);
  const [utilityRate, setUtilityRate] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  const updateSubmit = () => {
    const object = form.getFieldsValue();
    if (existEmpty(object) || currentAccount === "") {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  };

  const updateEstimatePrice = async () => {
    const object = form.getFieldsValue();
    const amount = object.amount;
    if (parseInt(amount)) {
      setEstimatePrice(await getUtilityPrice(amount));
    }
  };

  const onFieldsChange = () => {
    updateEstimatePrice();
    updateSubmit();
  };

  const updateRate = async () => {
    const rate = await getUtilityRate();
    setUtilityRate(rate);
  };

  const handleWithdraw = async () => {
    withdrawUtilityToken(currentAccount);
  };

  useEffect(() => {
    updateRate();
    updateSubmit();
  }, []);

  const submitForm = async (data) => {
    const object = data;
    const receiver = object.receiver;

    await buyUtilityToken(receiver, estimatePrice);
  };

  return (
    <div className={`p-4 bg-white rounded-xl ${className}`}>
      <Form onFinish={submitForm} form={form} onFieldsChange={onFieldsChange}>
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
            <div>
              <b>Rate:</b> 1 ETH / {utilityRate} {utilityTokenSymbol}
            </div>
            <div>
              <b>Estimated price:</b> {estimatePrice} ETH
            </div>
          </div>
          <div className="my-2">
            <Form.Item>
              <Button
                type="primary"
                size="large"
                shape="round"
                disabled={!canSubmit}
                className="center w-full"
                htmlType="submit"
              >
                Buy
              </Button>
            </Form.Item>
          </div>
          <div className="my-2">
            <Button
              type="primary"
              size="large"
              shape="round"
              disabled={currentAccount === ""}
              onClick={handleWithdraw}
              className="center w-full"
            >
              Withdraw
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BuyUtilityTokenCard;
