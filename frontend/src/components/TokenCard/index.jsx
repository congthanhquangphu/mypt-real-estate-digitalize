import { MetamaskContext } from "context/MetmaskContext";
import { Pagination, Spin } from "antd";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import config from "utils/config";
import BasicEstateItem from "components/BasicEstateItem";
import estate from "services/estate";
import { SecurityTokenContext } from "context/SecurityTokenContext";

const TokenCard = () => {
  const { currentAccount } = useContext(MetamaskContext);
  const { getSecurityOwnedTokenCount, getSecurityOwnedToken } =
    useContext(SecurityTokenContext);

  const [page, setPage] = useState(1);
  const [totalToken, setTotalToken] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const count = await getSecurityOwnedTokenCount();
    setTotalToken(count);

    const itemPerPage = config.ITEM_PER_PAGE_TOKEN;
    const ownedTokens = await getSecurityOwnedToken(
      itemPerPage,
      (page - 1) * itemPerPage
    );

    // Find estate information for each token
    const listToken = [];
    for (const index in ownedTokens) {
      const data = {
        estateId: ownedTokens[index].tokenId,
      };

      try {
        const result = await estate.getInformation(data);
        listToken.push({
          ...ownedTokens[index],
          ...result.data.estate,
        });
      } catch (err) {
        console.error(err);
      }
    }

    setTokens(listToken);
    setLoading(false);
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
        ) : loading ? (
          <div className="flex flex-col items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-x-2 w-full">
            {tokens.map((token) => (
              <BasicEstateItem
                className="m-1"
                key={token.id}
                id={token.id}
                approval={token.approval}
                title={token.title}
                location={token.location}
                profit={token.profit}
                totalSupply={token.totalSupply}
              >
                <div className="grid grid-cols-2 text-left p-2">
                  <b>Token ID: </b> {token.tokenId}
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
          defaultPageSize={config.ITEM_PER_PAGE_TOKEN}
          onChange={handlePageChange}
          total={totalToken}
        />
      </div>
    </div>
  );
};

export default TokenCard;
