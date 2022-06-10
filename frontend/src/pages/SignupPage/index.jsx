import React, { useState } from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  MailOutlined,
  ApiOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { connectMetamask, getAccounts, isConnected } from "../../utils/metamask";
import { useEffect } from "react";
import api from '../../utils/api';

const SignupPage = () => {
  const navigator = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState();

  useEffect(() => {
    refreshData();
    console.log(wallet);
  }, []);

  const refreshData = async () => {
    setWallet(await getAccounts());
  };

  const onConnect = () => {
    connectMetamask();
    refreshData();
  };

  const onSubmit = () => {
    if (fullname === "" || email === "" || password === "") {
      alert("Please fill-in all the data");
      return;
    }
    if (wallet === "") {
      alert("Please connect to your wallet");
      return;
    }
    const data = {
      fullname: fullname,
      email: email,
      password: password,
      wallet: wallet,
    };  
    api.post('/accounts/login', data)
  };

  return (
    <div className="p-4 w-1/3 bg-white rounded-xl ">
      <h1>Registry form</h1>
      <hr className="mt-2 mb-2" />
      <div>
        <h3>Basic information</h3>
        <div className="m-2">
          <Input
            size="middle"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full name"
            prefix={<UserOutlined />}
          />
        </div>
        <div className="m-2">
          <Input
            size="middle"
            placeholder="Email"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-2">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="middle"
            prefix={<LockOutlined />}
          />
        </div>
        <hr className="m-2" />
        <h3>Wallet information</h3>
        <div className="m-2 justify-between items-center flex flex-row">
          <div>Wallet address:</div>
          { isConnected() ? (
            <div>{wallet}</div>
          ) : (
            <div>
              <Button
                className="w-full"
                type="primary"
                shape="round"
                icon={<ApiOutlined />}
                onClick={onConnect}
              >
                Connect to Metamask
              </Button>
            </div>
          )}
        </div>
        <hr className="m-2" />
        <div className="m-2 flex flex-row justify-between">
          <Button
            shape="round"
            style={{ backgroundColor: "#e7e7e7" }}
            className="center w-full m-2"
            onClick={() => navigator("/")}
          >
            Back to home
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            shape="round"
            className="center w-full m-2"
            onClick={onSubmit}
          >
            Registry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
