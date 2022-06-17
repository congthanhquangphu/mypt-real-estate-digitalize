import React from "react";
import { useNavigate } from "react-router";
import defaultRealEstate from "res/default_real_estate.jpg";

const PendingEstateItem = (props) => {
  const id = props.id;
  const title = props.title || "";
  const image = props.image || defaultRealEstate;
  const location = props.location || "";
  const profit = props.profit || 0;
  const className = props.className || "";

  const navigator = useNavigate();

  const onClickCard = () => {
    navigator(`/real_estate/${id}`);
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
        <div>Location:</div>
        <div>{location}</div>
        <div>Profit expectation:</div>
        <div>{profit}% APR</div>
      </div>
    </button>
  );
};

export default PendingEstateItem;
