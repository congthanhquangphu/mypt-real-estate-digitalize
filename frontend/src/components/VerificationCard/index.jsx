import { Button, notification } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import React, { useEffect, useContext, useState } from "react";
import { constant } from "utils/config";
import * as estate from "services/estate";

const VerificationCard = (props) => {
  const { currentAccount, mintToken } = useContext(MetamaskContext);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const className = props.className;
  const estate_id = props.id;
  const register_address = props.register_address || "";
  const total_supply = props.total_supply || 0;
  const approval = props.approval || "";

  const handleAcceptRegistry = async () => {
    setIsAcceptLoading(true);

    await estate.uploadIPFS({ estate_id: estate_id }, async (err, res) => {
      if (err) {
        notification["error"]({
          message: "Upload to IPFS",
          description: "Cannot upload to IPFS",
        });
        return;
      }

      const cid = res.data.cid;
      const token_id = estate_id;
      const transaction = await mintToken(
        token_id,
        cid,
        register_address,
        total_supply
      );
      console.log(transaction);

      const data = {
        estate_id: estate_id,
        token_id: token_id,
        cid: cid,
      };

      await estate.mintToken(data, (err, res) => {
        if (err) {
          console.log(err);

          notification["error"]({
            message: "Mint token",
            description: "Cannot mint tokens",
          });
          return;
        }

        notification["success"]({
          message: "Mint token",
          description: "Verify successfully",
        });
        window.location.reload();
      });

      setIsAcceptLoading(false);
    });
  };

  useEffect(() => {});

  return (
    <div className={`${className} p-4 bg-white rounded-xl w-full`}>
      <div className="h-1/4">
        <h1>Verification</h1>
        <hr className="my-2" />
      </div>
      {approval === "pending" ? (
        currentAccount === constant.admin ? (
          <div className="w-full flex justify-center items-center text-center p-4 h-3/4">
            <Button
              onClick={handleAcceptRegistry}
              style={{
                width: "70%",
                height: "30%",
                backgroundColor: "green",
                color: "white",
              }}
              loading={isAcceptLoading}
              disabled={isAcceptLoading}
            >
              Accept
            </Button>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center text-center p-4 h-3/4">
            <h1 className="text-red-600">Only admin can verify</h1>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center items-center text-center p-4 h-3/4">
          <h1 className="text-green-600">The estate was verified</h1>
        </div>
      )}
    </div>
  );
};

export default VerificationCard;
