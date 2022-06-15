import React from "react";
import AccountCard from "components/AccountCard";
import TransactionCard from "components/TransactionCard";
import UtilityTokenCard from "components/UtilityTokenCard";

const UserPage = () => {
  const transactions = [];
  for (let i = 0; i < 0; i++) {
    transactions.push({
      key: `0x000${i}`,
      hash: `0x000${i}`,
      sender: "0x0001",
      receiver: "0x0002",
      amount: 10,
      token: "ETH",
    });
  }
  return (
    <div className="flex flex-col justify-center w-full items-center">
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-5/12">
            <AccountCard />
            <UtilityTokenCard />
          </div>
          <TransactionCard className="w-7/12" transactions={transactions} />
        </div>
    </div>
  );
};

export default UserPage;
