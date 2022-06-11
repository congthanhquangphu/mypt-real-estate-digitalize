import React, { useState } from "react";
import { Radio } from "antd";
import { useEffect } from "react";
import RealEstateCard from "components/RealEstateCard";

const RealEstatePage = () => {
  const [filterStatus, setFilterStatus] = useState("selling");
  const [listRealEstate, setListRealEstate] = useState([]);

  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < 10; i++) {
      tmp.push({
        key: `${i}`,
        id: `${i}`,
        title: "Van Phuc City",
        location: "Ho Chi Minh",
        investTime: 6,
        profit: 18,
        currentInvestors: 3,
        currentParts: 20,
        totalSupply: 1000,
        status: "Selling"
      });
    }
    setListRealEstate(tmp);
  }, []);

  const onChangeStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="w-full h-full m-5">
      <div>
        <h1>Real estate property</h1>
        <Radio.Group
          value={filterStatus}
          onChange={onChangeStatus}
          defaultValue="selling"
          size="large"
        >
          <Radio.Button value="incoming">Incoming</Radio.Button>
          <Radio.Button value="selling">Selling</Radio.Button>
          <Radio.Button value="sold">Sold</Radio.Button>
        </Radio.Group>
      </div>
      <div className="p-2 flex flex-wrap justify-center">
        {listRealEstate.map((item) => {
          return (
            <RealEstateCard
              key={item.id}
              title={item.title}
              totalSupply={item.totalSupply}
              profit={item.profit}
              investTime={item.investTime}
              status={item.status}
              location={item.location}
              currentInvestors={item.currentInvestors}
              currentParts={item.currentParts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RealEstatePage;
