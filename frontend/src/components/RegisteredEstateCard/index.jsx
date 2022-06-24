import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "antd";
import { MetamaskContext } from "context/MetmaskContext";
import BasicEstateItem from "components/BasicEstateItem";
import config from "utils/config";
import estate from "services/estate";

const RegisteredEstateCard = (props) => {
  const className = props.className || "";
  const { currentAccount } = useContext(MetamaskContext);

  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(0);

  useEffect(() => {
    refreshData();
  }, [page, currentAccount, totalEstate]);

  const onPageChange = (e) => {
    setPage(e);
  };

  const refreshData = async () => {
    if (currentAccount === "") {
      return;
    }
    try {
      const resultCount = await estate.getCount({
        registerAddress: currentAccount,
      });
      const count = parseInt(resultCount.data.count);
      setTotalEstate(count);

      const itemPerPage = config.ITEM_PER_PAGE_REGISTRY;
      let data = {
        registerAddress: currentAccount,
        limit: itemPerPage,
        offset: (page - 1) * itemPerPage,
      };

      const resultList = await estate.getList(data);
      setListEstate(resultList.data.estates);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`bg-white flex flex-col rounded-xl w-fit p-4 ${className}`}>
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
                  totalSupply={element.totalSupply}
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
          pageSize={config.ITEM_PER_PAGE_REGISTRY}
          total={totalEstate}
        />
      </div>
    </div>
  );
};

export default RegisteredEstateCard;
