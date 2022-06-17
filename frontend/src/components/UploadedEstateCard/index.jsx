import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "antd";
import { MetamaskContext } from "context/MetamaskProvider";
import BasicEstateItem from "components/BasicEstateItem";
import * as config from "utils/config";
import * as estate from "services/estate";

const UploadedEstateCard = (props) => {
  const className = props.className || "";
  const { currentAccount } = useContext(MetamaskContext);

  const [listEstate, setListEstate] = useState([]);
  const [page, setPage] = useState(1);
  const [totalEstate, setTotalEstate] = useState(1);

  useEffect(() => {
    refreshData();
  }, [page, totalEstate]);

  const onPageChange = (e) => {
    setPage(e);
  };

  const refreshData = () => {
    if (currentAccount === "") return;

    estate.getCount({ uploader_address: currentAccount }, (err, res) => {
      if (err) return;

      console.log(res);
      const count = parseInt(res.data.count);
      setTotalEstate(count);

      const itemPerPage = config.constant.item_per_page_estate;
      let data = {
        limit: itemPerPage,
        offset: (page - 1) * itemPerPage,
      };
      estate.getList(data, (err, res) => {
        if (err) return;
        // setListEstate(res.data.estates);
      });
    });
  };
  return (
    <div
      className={`bg-white min-h-full flex flex-col rounded-xl w-fit p-4 ${className}`}
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
              return <BasicEstateItem className="m-1" title={element.title} />;
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
          total={20}
        />
      </div>
    </div>
  );
};

export default UploadedEstateCard;
