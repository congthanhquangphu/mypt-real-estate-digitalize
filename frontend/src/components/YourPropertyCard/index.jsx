import React from "react";
import { Pagination } from "antd";

const YourPropertyCard = () => {
  return (
    <div className="bg-white min-h-full flex flex-col rounded-xl w-full p-4">
      <div>
        <h1>Your real estates</h1>
        <hr className="m-2" />
      </div>
      <div className=" flex flex-wrap h-[90%] justify-center"> Content </div>
      <div className="p-2 m-2 rounded-xl bg-white">
        <Pagination
          className="flex flex-row justify-center m-2"
          defaultCurrent={1}
        />
      </div>
    </div>
  );
};

export default YourPropertyCard;
