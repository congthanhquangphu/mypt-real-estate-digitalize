import React from "react";
import { useNavigate } from "react-router";
import defaultRealEstate from "res/default_real_estate.jpg";
import utils from "utils/utils";

const BasicEstateItem = (props) => {
  const id = props.id;
  const title = props.title || "Title";
  const image = props.image || defaultRealEstate;
  const location = props.location || "";
  const profit = props.profit || 0;
  const approval = props.approval || "pending";
  const className = props.className || "";
  const totalSupply = props.totalSupply || 0;
  const children = props.children;

  const navigator = useNavigate();

  const onClickCard = () => {
    navigator(`/estate/${id}`);
  };

  return (
    <button
      className={`border border-black-200 p-5 rounded-xl w-fit h-fit bg-gray-100 ${className}`}
      onClick={onClickCard}
    >
      <div className="justify-center flex flex-row">
        <img alt="real_estate" src={image} className="w-[256px] rounded-xl" />
      </div>
      <h2 className="my-2">{title}</h2>
      <hr className="my-2" />
      <div className="grid p-2 text-left gap-x-2 grid-cols-2">
        <b>Approval:</b>
        {approval === "pending" ? (
          <div className="text-amber-600">
            {utils.capitalizeFirstLetter(approval)}
          </div>
        ) : approval === "approved" ? (
          <div className="text-green-600">
            {utils.capitalizeFirstLetter(approval)}
          </div>
        ) : (
          <div className="text-red-600">{utils.capitalizeFirstLetter(approval)}</div>
        )}
        <b>Location:</b>
        <div>{location}</div>
        <b>Profit expectation:</b>
        <div>{profit}% APR</div>{" "}
        <b>Total supply:</b>
        <div>{totalSupply} tokens</div>
      </div>
      {children && (
        <>
          <hr className="my-2" />
          {children}
        </>
      )}
    </button>
  );
};

export default BasicEstateItem;
