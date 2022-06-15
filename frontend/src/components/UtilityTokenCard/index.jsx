import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";

const CrowdsaleCard = () => {
  return (
    <div className="p-4 m-2 bg-white rounded-xl ">
      <h1>Buy utility token</h1>
      <hr className="mt-2 mb-2" />
      <div>
        <div className="m-2">
          <Input
            size="large"
            placeholder="Receiver's address"
          />
        </div>
        <div className="m-2">
          <Input
            size="large"
            placeholder="Amount"
          />
        </div>
        <div className="m-2">
          <Button
            type="primary"
            size="large"
            shape="round"
            className="center w-full"
          >
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrowdsaleCard;
