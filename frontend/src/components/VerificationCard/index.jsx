import { Button, notification } from "antd";
import { MetamaskContext } from "context/MetmaskContext";
import React, { useEffect, useContext, useState } from "react";
import config from "utils/config";
import estate from "services/estate";

const VerificationCard = (props) => {
  const { currentAccount, mintToken } = useContext(MetamaskContext);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const className = props.className;
  const estateId = props.id;
  const registerAddress = props.registerAddress || "";
  const totalSupply = props.totalSupply || 0;
  const approval = props.approval || "";

  const handleAcceptRegistry = async () => {
    setIsAcceptLoading(true);

    try {
      // Upload certificate to IPFS
      const result = await estate.uploadIPFS({ estateId: estateId });

      // Notify uploaded
      notification["success"]({
        message: "Upload to IPFS",
        description: "Done upload to IPFS",
      });

      // Mint tokens
      const cid = result.data.cid;
      const tokenId = estateId;
      const transaction = await mintToken(
        tokenId,
        cid,
        registerAddress,
        totalSupply
      );
      console.log(transaction);

      // Accept registry
      const data = {
        estateId: estateId,
        tokenId: tokenId,
        cid: cid,
      };
      try {
        await estate.acceptRegistry(data);

        notification["success"]({
          message: "Mint token",
          description: "Verify successfully",
        });

        window.location.reload();
      } catch (err) {
        console.error(err);

        notification["error"]({
          message: "Mint token",
          description: "Cannot mint tokens",
        });
      }
    } catch (err) {
      console.error(err);
      notification["error"]({
        message: "Upload to IPFS",
        description: "Cannot upload to IPFS",
      });
    }
    setIsAcceptLoading(false);
  };

  useEffect(() => {});

  return (
    <div className={`${className} p-4 bg-white rounded-xl w-full`}>
      <div className="h-1/4">
        <h1>Verification</h1>
        <hr className="my-2" />
      </div>
      {approval === "pending" ? (
        currentAccount === config.ADMIN_ADDRESS ? (
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
