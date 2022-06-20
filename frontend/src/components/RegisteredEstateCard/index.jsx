import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import BasicEstateItem from "components/BasicEstateItem";
import * as config from "utils/config";
import * as estate from "services/estate";

const RegisteredEstateCard = (props) => {
  const className = props.className || "";
  const { currentAccount } = useContext(MetamaskContext);

  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(1);

  useEffect(() => {
    refreshData();
  }, [page, currentAccount, totalEstate]);

  const onPageChange = (e) => {
    setPage(e);
  };

  const refreshData = () => {
    estate.getCount({ register_address: currentAccount }, (err, res) => {
      if (err) return;

      const count = parseInt(res.data.count);
      setTotalEstate(count);

      const itemPerPage = config.constant.item_per_page_registry;
      let data = {
        register_address: currentAccount,
        limit: itemPerPage,
        offset: (page - 1) * itemPerPage,
      };
      estate.getList(data, (err, res) => {
        if (err) return;
        console.log(res.data.estates)
        setListEstate(res.data.estates);
      });
    });
  };

  return (
    <div
      className={`bg-white flex flex-col rounded-xl w-fit p-4 ${className}`}
    >
      <div>
        <h1>Uploaded real estates</h1>
        <hr className="m-2" />
      </div>
      <div className="flex flex-wrap h-[90%]">
        {currentAccount === "" ? (
          <div className="flex flex-col items-center justify-center w-full">
            <h2>Please connect your wallet to view estates</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 w-full h-full place-items-center">
            {listEstate.map((element) => {
              return (
                <BasicEstateItem
                  className="m-1"
                  key={element.id}
                  id={element.id}
                  approval={element.approval}
                  title={element.title}
                  location={element.location}
                  profit={element.profit}
                  totalSupply={element.total_supply}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="p-2 m-2 rounded-xl bg-white">
        <Pagination
          className="flex flex-row justify-center m-2"
          defaultCurrent={1}
          value={page}
          onChange={onPageChange}
          pageSize={config.constant.item_per_page_registry}
          total={totalEstate}
        />
      </div>
    </div>
  );
};

export default RegisteredEstateCard;
