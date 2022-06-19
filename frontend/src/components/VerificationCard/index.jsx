import { Button } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import React, { useEffect, useContext } from "react";
import { constant } from "utils/config";
import { message as AntMessage } from "antd";
import { mintToken, uploadIPFS } from "services/estate";

const VerificationCard = (props) => {
  const { currentAccount } = useContext(MetamaskContext);
  const className = props.className;
  const estate_id = props.estate_id;

  const handleAcceptRegistry = () => {
    uploadIPFS({ estate_id: estate_id }, (err, res) => {
      if (err) {
        AntMessage.error("Cannot upload to IPFS");
        return;
      }

      const cid = res.data.cid;

      const data = {
        estate_id: estate_id,
        cid: cid,
      };

      mintToken(data, (err, res) => {
        if (err) {
          AntMessage.error("Cannot mint token");
          return;
        }
      });
    });
  };

  useEffect(() => {});

  return (
    <div className={`${className} p-4 bg-white rounded-xl w-full`}>
      <div className="h-1/4">
        <h1>Verification</h1>
        <hr className="my-2" />
      </div>
      {currentAccount === constant.admin ? (
        <div className="w-full flex justify-center items-center text-center p-4 h-3/4">
          <Button
            onClick={handleAcceptRegistry}
            style={{
              borderRadius: "5%",
              backgroundColor: "green",
              color: "white",
              width: "70%",
              height: "30%",
            }}
          >
            Accept
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center text-center p-4 h-3/4">
          <h1 className="text-red-600">Only admin can verify</h1>
        </div>
      )}
    </div>
  );
};

export default VerificationCard;
