import React, { useState } from "react";
import "./style.css";
import { useEffect } from "react";
import * as account from "services/account";
import { useNavigate } from "react-router";
import AccountCard from "components/AccountCard";
import ListTransactionsCard from "components/TransactionCard";

const AccountPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    refreshData();
  }, []);

  const transactions = [];
  for (let i = 0; i < 100; i++) {
    transactions.push({
      key: `0x000${i}`,
      hash: `0x000${i}`,
      sender: "0x0001",
      receiver: "0x0002",
      amount: 10,
      token: "ETH",
    });
  }

  const refreshData = () => {
    const data = {
      headers: {
        "x-access-token": localStorage.token,
      },
    };
    account.getInformation(data, (err, res) => {
      if (err) {
        navigator("/");
        return;
      }

      const data = res.data;
      if (data.exitcode === 0) {
        setFullname(data.fullname);
        setEmail(data.email);
        setWallet(data.wallet_address);
      } else {
        navigator("/");
      }
    });
  };

  return (
    <div className="h-[80vh]">
      <div className="flex max-h-[80%] flex-row">
        <AccountCard />
        <ListTransactionsCard transactions={transactions} />
      </div>
    </div>
  );
};

export default AccountPage;
