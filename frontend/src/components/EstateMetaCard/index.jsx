import { Button, Modal } from "antd";
import TokenSellCard from "components/TokenSellCard";
import React, { useEffect, useState } from "react";
import defaultEstateImage from "res/default_real_estate.jpg";
import utils from "utils/utils";

const EstateMetaCard = (props) => {
  const image = props.image || defaultEstateImage;
  const title = props.title || "Title";
  const approval = props.approval || "";
  const location = props.location || "location";
  const profit = props.profit || 0;
  const landArea = props.landArea || 0;
  const constructionArea = props.constructionArea || 0;
  const description = props.description || "";
  const cid = props.ipfsCid || "";
  const tokenId = props.tokenId || "";
  const totalSupply = props.totalSupply || 0;
  const className = props.className;
  const balance = props.balance || 0;

  const [openSellModal, setOpenSellModal] = useState(false);

  const handleSell = () => {
    setOpenSellModal(true);
  };

  const handleOk = () => {
    setOpenSellModal(false);
  };

  const handleCancel = () => {
    setOpenSellModal(false);
  };

  return (
    <div
      className={`${className} p-4 w-full h-full flex flex-row rounded-xl bg-white`}
    >
      <div className="m-2 max-h-[300px] max-w-[300px]">
        <img src={image} alt="estate_image" className="h-full rounded-xl" />
      </div>
      <div className="px-6 w-full">
        <div className="flex flex-row justify-between w-full">
          <div>
            <h2>{title}</h2>
            <div className="flex flex-row gap-x-2">
              <b>Approval: </b>
              {approval === "pending" ? (
                <div className="text-amber-600">
                  {utils.capitalizeFirstLetter(approval)}
                </div>
              ) : approval === "approved" ? (
                <div className="text-green-600">
                  {utils.capitalizeFirstLetter(approval)}
                </div>
              ) : (
                <div className="text-red-600">
                  {utils.capitalizeFirstLetter(approval)}
                </div>
              )}
            </div>
          </div>
          <div className="p-2 rounded-xl h-fit w-[128px] text-center bg-sky-600 text-white">
            {totalSupply} parts
          </div>
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <div>
            <b>Location: </b> {location}
          </div>
          <div>
            <b>Estimate profit (APY): </b> {profit}%
          </div>
          <div>
            <b>Land area: </b> {landArea}m<sup>2</sup>
          </div>
          <div>
            <b>Construction area: </b> {constructionArea}m<sup>2</sup>
          </div>
        </div>
        <div className="my-2">
          <b>Description: </b> {description}
        </div>
        <hr className="my-2" />
        <div className="flex flex-row justify-between items-end">
          <div>
            <div>
              <b>Token ID:</b> {tokenId}
            </div>
            <div>
              <b>CID:</b>{" "}
              <a target="blank" href={`https://${cid}.ipfs.dweb.link/`}>
                {cid}
              </a>
            </div>
            <div>
              <b>Balance:</b> {balance} tokens
            </div>
          </div>
          {balance > 0 && (
            <Button
              shape="round"
              onClick={handleSell}
              size="large"
              style={{
                backgroundColor: "green",
                width: "128px",
                color: "white",
              }}
            >
              Sell
            </Button>
          )}
        </div>
      </div>

      <Modal visible={openSellModal} onOk={handleOk} onCancel={handleCancel}>
        <TokenSellCard />
      </Modal>
    </div>
  );
};

export default EstateMetaCard;
