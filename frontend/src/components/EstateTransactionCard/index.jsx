import React from "react";

const EstateTransactionCard = (props) => {
  const className = props.className || "";

  return (
    <div className={`${className} bg-white p-4 h-full rounded-xl`}>
      <h1>Transactions</h1>
      <hr />
    </div>
  );
};

export default EstateTransactionCard;
