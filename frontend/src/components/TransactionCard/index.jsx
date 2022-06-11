import React from "react";

const TransactionCard = (props) => {
  const transactions = props.transactions || [];

  return (
    <div className="p-5 m-2 bg-white flex flex-col rounded-xl">
      <div>
        <h1>Transaction</h1>
        <hr className="p-2" />
      </div>
      <div className="overflow-x-scroll">
        <table>
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
