import React from "react";
import defaultRealEstate from "res/default_real_estate.jpg";

const RealEstateCard = (props) => {
  const title = props.title || "";
  const image = props.image || defaultRealEstate;
  const status = props.status || "";
  const location = props.location || "";
  const totalSupply = props.totalSupply || 0;
  const profit = props.profit || 0;
  const invest_time = props.investTime || 0;
  const currentInvestors = props.currentInvestors || 0;
  const currentParts = props.currentParts || 0;

  return (
    <button className="w-fit p-5 rounded-xl bg-white m-2">
      <h2>{title}</h2>
      <div className="justify-center flex flex-row">
        <img alt="real_estate" src={image} className="w-[256px] rounded-xl" />
      </div>
      <div className="items-center p-2 flex flex-row justify-between">
        <div>
          {status === "selling" ? (
            <h3 className="m-0 text-left text-sky-600">Selling</h3>
          ) : status === "sold" ? (
            <h3 className="m-0 text-left text-green-600">Sold</h3>
          ) : (
            <h3 className="m-0 text-left text-yellow-600">Upcoming</h3>
          )}
          <h3 className="m-0 text-left">{location}</h3>
        </div>
        <div className="p-2 bg-gray-600 text-white rounded w-fit">
          {totalSupply} parts
        </div>
      </div>
      <hr className="m-2" />
      <div className="grid p-2 text-left gap-x-2 grid-cols-2">
        <div>Investing time:</div>
        <div>{invest_time} month(s)</div>
        <div>Profit expectation:</div>
        <div>{profit}% APR</div>
        <div>Total investors:</div>
        <div>{currentInvestors}</div>
      </div>
      <hr className="m-2" />
      <div className="flex flex-row justify-between"></div>
      <div className="rounded-xl bg-gray-300 w-[100%] h-6">
        <div className="rounded-xl bg-yellow-600 w-[20%] h-6" />
        <div className="-mt-[24px] relative">{currentParts}/1000</div>
      </div>
    </button>
  );
};

export default RealEstateCard;
