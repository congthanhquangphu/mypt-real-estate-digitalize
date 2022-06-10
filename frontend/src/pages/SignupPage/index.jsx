import React, { useState, useRef } from "react";
import { Button, Input, message as AntMessage } from "antd";
import {
  UserOutlined,
  MailOutlined,
  ApiOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router";
import {
  connectMetamask,
  getAccounts,
  isConnected,
} from "../../utils/metamask";
import { useEffect } from "react";
import api from "../../utils/api";

const SignupPage = () => {
  const navigator = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    refreshData();
  });

  const onFullnameChange = (e) => {
    setFullname(e.target.value);
    updateCanSubmit();
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    updateCanSubmit();
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    updateCanSubmit();
  };

  const updateCanSubmit = () => {
    setCanSubmit(
      fullname !== "" && email !== "" && password !== "" && wallet !== ""
    );
  };

  const refreshData = async () => {
    const wallet = await getAccounts();
    setWallet(wallet);
    updateCanSubmit();
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
      wallet_address: wallet,
    };
    api
      .post("/account/signup", data)
      .then((res) => {
        const data = res.data;
        const exitcode = data.exitcode;
        const message = data.message;
        if (exitcode === 0) {
          AntMessage.success(message);
          navigator("/login");
        } else {
          AntMessage.error(message);
        }
      })
      .catch((err) => {
        AntMessage.error("Request fail");
      });
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
            onChange={onFullnameChange}
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
            onChange={onEmailChange}
          />
        </div>
        <div className="m-2">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            size="middle"
            prefix={<LockOutlined />}
          />
        </div>
        <hr className="m-2" />
        <h3>Wallet information</h3>
        <div className="m-2 justify-between items-center flex flex-row">
          <div>Wallet address:</div>
          {isConnected() ? (
            <div>{wallet}</div>
          ) : (
            <div>
              <Button
                className="w-full"
                type="primary"
                style={{ backgroundColor: "green" }}
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
            type="primary"
            shape="round"
            className="center w-full m-2"
            onClick={onSubmit}
            disabled={!canSubmit}
          >
            Registry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
