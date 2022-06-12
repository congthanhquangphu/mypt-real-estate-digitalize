import React, { useState, useEffect } from "react";
import { message as AntMessage } from "antd";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router";
import { connectMetamask, getAccounts } from "utils/metamask.js";
import * as account from "services/account.js";
import SignupForm from "components/SignupForm";

const SignupPage = () => {
  const navigator = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletAddress, setWalletAddress] = useState();

  useEffect(() => {
    refreshData();
  });

  const onFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const refreshData = async () => {
    setWalletAddress(await getAccounts());
  };

  const onConnect = () => {
    connectMetamask();
    refreshData();
  };

  const onSubmit = () => {
    const data = {
      fullname: fullname,
      email: email,
      password: sha256(password),
      wallet_address: walletAddress,
    };
    account.signup(data, (err, res) => {
      if (err) {
        AntMessage.error("Request fail");
        return;
      }

      const data = res.data;
      const exitcode = data.exitcode;
      const message = data.message;
      if (exitcode === 0) {
        AntMessage.success(message);
        navigator("/login");
      } else {
        AntMessage.error(message);
      }
    });
  };

  return (
    <SignupForm
      fullname={fullname}
      onFullnameChange={onFullnameChange}
      email={email}
      onEmailChange={onEmailChange}
      password={password}
      onPasswordChange={onPasswordChange}
      onConnect={onConnect}
      onSubmit={onSubmit}
      walletAddress={walletAddress}
    />
  );
};

export default SignupPage;
