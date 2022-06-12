import React, { useState } from "react";
import { Radio, Pagination } from "antd";
import { useEffect } from "react";
import RealEstateCard from "components/RealEstateCard";
import * as estate from "services/estate";
import * as config from "utils/config.js";

const RealEstatePage = () => {
  const [filterStatus, setFilterStatus] = useState("selling");
  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(1);

  useEffect(() => {
    refreshData();
  }, [page, filterStatus, totalEstate]);

  const refreshData = () => {
    estate.getCount({ filter: filterStatus }, (err, res) => {
      if (err) return;

      const count = parseInt(res.data.count);
      setTotalEstate(count);

      const itemPerPage = config.constant.item_per_page;

      let data = {
        filter: filterStatus,
        limit: itemPerPage,
        offset: (page - 1) * itemPerPage,
      };

      estate.getList(data, (err, res) => {
        if (err) return;
        console.log(res)
        setListEstate(res.data.estates);
      });
    });
  };

  const onFilterStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const onPageChange = (e) => {
    setPage(e);
  };

  return (
    <div className="w-full m-5 flex flex-col content-start">
      <div>
        <h1>Real estate property</h1>
        <Radio.Group
          value={filterStatus}
          onChange={onFilterStatusChange}
          defaultValue="selling"
          size="large"
        >
          <Radio.Button value="upcoming">Upcoming</Radio.Button>
          <Radio.Button value="selling">Selling</Radio.Button>
          <Radio.Button value="sold">Sold</Radio.Button>
        </Radio.Group>
      </div>
      <div className="p-2 flex flex-wrap justify-center h-full">
        {listEstate.map((item) => {
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
      <Pagination
        className="flex flex-row justify-center m-2"
        defaultCurrent={1}
        value={page}
        onChange={onPageChange}
        total={totalEstate}
      />
      ;
    </div>
  );
};

export default RealEstatePage;
