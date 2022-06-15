import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import "./style.css";

const TransactionCard = (props) => {
  const transactions = props.transactions || [];

  return (
    <div className="p-5 m-2 bg-white flex flex-col rounded-xl w-full max-h-screen">
      <div>
        <div className="flex flex-row justify-between">
          <h1>Transaction</h1>
          <button>
            <ReloadOutlined />
          </button>
        </div>
        <hr className="p-2" />
      </div>
      <div className="overflow-x-scroll w-full h-full">
        <table className="table-auto w-full h-full">
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
            {transactions.map((item) => {
              return (
                <tr key={item.hash}>
                  <td>{item.hash}</td>
                  <td>{item.sender}</td>
                  <td>{item.receiver}</td>
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

export default TransactionCard;
