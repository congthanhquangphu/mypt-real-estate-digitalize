import React, { useContext, useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import "./style.css";
import { Spin } from "antd";
import aurorascan from "services/aurorascan";
import utils from "utils/utils";
import { MetamaskContext } from "context/MetmaskContext";

const UserTransactionCard = (props) => {
  const className = props.className || "";
  const { currentAccount } = useContext(MetamaskContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const handleReload = async () => {
    if (currentAccount === "") return;

    setIsTransactionLoading(true);
    await aurorascan.fetchTransaction(currentAccount);
    setIsTransactionLoading(false);
    refreshData();
  };

  const refreshData = () => {
    try {
      const data = JSON.parse(localStorage.getItem("transactionHistory"));
      const history = data.filter((transaction) => {
        return (
          transaction.from === currentAccount ||
          transaction.to === currentAccount
        );
      });
      setTransactionHistory(history);
    } catch (err) {
      setTransactionHistory([]);
    }
  };

  useEffect(() => {
    handleReload();
    refreshData();
  }, [currentAccount]);

  return (
    <div
      className={`p-5 bg-white flex flex-col rounded-xl w-full ${className}`}
    >
      <div>
        <div className="flex flex-row justify-between">
          <h1>Transaction</h1>
          <div className="h-full">
            {isTransactionLoading ? (
              <Spin />
            ) : (
              <button>
                <ReloadOutlined onClick={handleReload} />
              </button>
            )}
          </div>
        </div>
        <hr className="p-2" />
      </div>
      <div className="overflow-x-scroll w-full h-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Transaction hash</th>
              <th>Sender address</th>
              <th>Receiver address</th>
              <th>Amount</th>
              <th>Token</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((item) => {
              return (
                <tr key={item.hash}>
                  <td>{item.hash}</td>
                  <td>{utils.shortenAddress(item.from)}</td>
                  <td>{utils.shortenAddress(item.to)}</td>
                  <td>{item.amount}</td>
                  <td>{item.token}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot />
        </table>
      </div>
    </div>
  );
};

export default UserTransactionCard;
