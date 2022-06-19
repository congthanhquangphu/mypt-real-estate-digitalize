import React, { useEffect } from "react";
import defaultEstateImage from "res/default_real_estate.jpg";
import { capitalizeFirstLetter } from "utils/utils";

const EstateDetailCard = (props) => {
  const estate_id = props.estate_id || 0;
  const image = props.image || defaultEstateImage;
  const title = props.title || "Title";
  const approval = props.approval || "";
  const location = props.location || "location";
  const profit = props.profit || 0;
  const land_area = props.land_area || 0;
  const construction_area = props.construction_area || 0;
  const description = props.description || "";
  const cid = props.cid || "";
  const token_id = props.token_id || "";
  const total_supply = props.total_supply || 0;

  return (
    <div className="p-4 w-fit flex flex-row rounded-xl bg-white">
      <div className="m-2 h-[256px]">
        <img
          src={image}
          alt="estate_image"
          className="h-full w-full rounded-xl"
        />
      </div>
      <div className="px-6">
        <div className="flex flex-row justify-between">
          <div>
            <h2>{title}</h2>
            <span>
              <b>Approval: </b>
              {capitalizeFirstLetter(approval)}
            </span>
          </div>
          <div className="p-2 rounded-xl h-fit bg-sky-600 text-white">
            {total_supply} parts
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
            <b>Land area: </b> {land_area}m<sup>2</sup>
          </div>
          <div>
            <b>Construction area (sqft): </b> {construction_area}m<sup>2</sup>
          </div>
        </div>
        <div className="my-2">
          <b>Description: </b> {description}
        </div>
        <hr className="my-2" />
        <div>
          <div>
            <b>Token ID:</b> {token_id}
          </div>
          <div>
            <b>CID:</b> {cid}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateDetailCard;
