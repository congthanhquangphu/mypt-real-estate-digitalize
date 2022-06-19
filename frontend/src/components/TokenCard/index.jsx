import { MetamaskContext } from "context/MetamaskProvider";
import { Pagination } from "antd";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import * as config from "utils/config";
import BasicEstateItem from "components/BasicEstateItem";

const TokenCard = () => {
  const { currentAccount, getSecurityOwnedTokenCount, getSecurityOwnedToken } =
    useContext(MetamaskContext);
  const [page, setPage] = useState(1);
  const [totalToken, setTotalToken] = useState(0);
  const [tokens, setTokens] = useState([]);

  const fetchData = async () => {
    const count = await getSecurityOwnedTokenCount();
    setTotalToken(count);

    const item_per_page_token = config.constant.item_per_page_token;
    const result = await getSecurityOwnedToken(
      item_per_page_token,
      (page - 1) * item_per_page_token
    );
    setTokens(result);
  };

  const handlePageChange = (e) => {
    setPage(e);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [currentAccount]);

  return (
    <div className="bg-white min-h-full flex flex-col rounded-xl w-full p-4">
      <div>
        <h1>Your tokens</h1>
        <hr className="m-2" />
      </div>
      <div className="flex flex-wrap h-[90%] justify-center">
        {currentAccount === "" ? (
          <div className="flex flex-col items-center justify-center">
            <h2>Please connect your wallet to view tokens</h2>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-x-2 w-full">
            {tokens.map((token) => (
              <BasicEstateItem {...token}>
                <div className="grid grid-cols-2 text-left p-2">
                  <b>Token ID:</b> {token.token_id}
                  <b>Total supply: </b> 1000 tokens
                  <b>Amount: </b> {token.balance} tokens
                </div>
              </BasicEstateItem>
            ))}
          </div>
        )}
      </div>
      <div className="p-2 m-2 rounded-xl bg-white">
        <Pagination
          className="flex flex-row justify-center m-2"
          defaultCurrent={1}
          value={page}
          defaultPageSize={config.constant.item_per_page_token}
          onChange={handlePageChange}
          total={totalToken}
        />
      </div>
    </div>
  );
};

export default TokenCard;
