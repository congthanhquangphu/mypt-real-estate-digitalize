import React, { useState } from "react";
import { Radio, Pagination } from "antd";
import { useEffect } from "react";
import EstateCard from "components/EstateCard";
import * as estate from "services/estate";
import * as config from "utils/config.js";

const MarketplacePage = () => {
  const [filterStatus, setFilterStatus] = useState("listing");
  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(1);

  useEffect(() => {
    // refreshData();
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
        console.log(res);
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
    <div className="w-full min-h-screen">
      <div>
        <div className="m-2 bg-white w-fit p-4 rounded-xl">
          <h1>Marketplace</h1>
          <h3>Selling methods</h3>
          <Radio.Group
            value={filterStatus}
            onChange={onFilterStatusChange}
            defaultValue="selling"
            size="large"
          >
            <Radio.Button value="listing">Listing</Radio.Button>
            <Radio.Button value="crowdfunding">Crowdfunding</Radio.Button>
            <Radio.Button value="bidding">Bidding</Radio.Button>
            <Radio.Button value="uniswap">Uniswap</Radio.Button>
          </Radio.Group>
        </div>
      </div>  
      <div className="p-2 m-2 rounded-xl bg-white">
        <div className="min-h-screen flex flex-wrap justify-center">
          {listEstate.map((item) => {
            return (
              <EstateCard
                key={item.id}
                id={item.id}
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
      </div>
    </div>
  );
};

export default MarketplacePage;
