import React, { useState } from "react";
import { Radio, Pagination } from "antd";
import { useEffect } from "react";
// import PendingEstateCard from "components/PedingEstateCard";
import * as estate from "services/estate";
import { capitalizeFirstLetter } from "utils/utils";
import * as config from "utils/config.js";
import CrowdFundingEstateItem from "components/CrowdFundingEstateItem";

const MarketplacePage = (props) => {
  const [filterStatus, setFilterStatus] = useState("listing");
  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(1);
  const sellType = props.sellType || "";

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
        setListEstate(res.data.estates);
      });
    });
  };

  const onPageChange = (e) => {
    setPage(e);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="p-4 m-2 rounded-xl bg-white">
        <h1>{capitalizeFirstLetter(sellType)} marketplace</h1>
        <hr className="p-2"/>
        <div className="min-h-screen flex flex-wrap justify-center">
          {listEstate.map((item) => {
            return (
              <CrowdFundingEstateItem
                // key={item.id}
                // id={item.id}
                // title={item.title}
                // totalSupply={item.totalSupply}
                // profit={item.profit}
                // investTime={item.investTime}
                // status={item.status}
                // location={item.location}
                // currentInvestors={item.currentInvestors}
                // currentParts={item.currentParts}
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
