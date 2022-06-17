import React, { useEffect, useState, useContext } from "react";
import { Button, Form, Input, InputNumber, message as AntMessage } from "antd";
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
  const [canBuy, setCanBuy] = useState(false);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

  const updateSubmit = () => {
    const object = form.getFieldsValue();
    if (existEmpty(object) || currentAccount === "") {
      setCanBuy(false);
      return;
    }
    setCanBuy(true);
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
    try {
      setIsWithdrawLoading(true);
      const transaction = await withdrawUtilityToken(currentAccount);
      console.log(transaction);
      setIsWithdrawLoading(false);
      AntMessage.success("Withdraw successfully");

      window.location.reload();
    } catch (err) {
      AntMessage.error("Withdraw failed");
    }
  };

  const buyToken = async (data) => {
    try {
      const object = data;
      const receiver = object.receiver;

      setIsBuyLoading(true);
      form.resetFields();
      updateSubmit();

      const transaction = await buyUtilityToken(receiver, estimatePrice);
      console.log(transaction);

      setIsBuyLoading(false);
      AntMessage.success("Buy successfully");
    } catch (err) {
      AntMessage.error("Buy failed");
    }
  };

  useEffect(() => {
    updateRate();
    updateSubmit();
  }, []);

  return (
    <div className={`p-4 bg-white rounded-xl ${className}`}>
      <Form onFinish={buyToken} form={form} onFieldsChange={onFieldsChange}>
        <h1>Buy utility token</h1>
        <hr className="my-2" />
        <div className="w-full">
          <div className="my-2">
            <h3>Receiver address</h3>
            <Form.Item name="receiver">
              <Input
                rules={[{ required: true }]}
                size="large"
                placeholder="0x23fe..."
              />
            </Form.Item>
          </div>
          <div className="my-2">
            <h3>Amount</h3>
            <Form.Item name="amount">
              <InputNumber
                min={0}
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
                disabled={!canBuy}
                className="center w-full"
                htmlType="submit"
                loading={isBuyLoading}
              >
                Buy
              </Button>
            </Form.Item>
          </div>
          <div className="my-2">
            <Button
              type="primary"
              size="large"
              loading={isWithdrawLoading}
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
