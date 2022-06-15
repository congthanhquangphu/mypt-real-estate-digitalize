import React, { useState, useEffect, useContext } from "react";
import { Button, Input } from "antd";
import { MetamaskProvider } from "context/MetamaskProvider";
import {
  UserOutlined,
  MailOutlined,
  ApiOutlined,
  LockOutlined,
} from "@ant-design/icons";

const SignupForm = (props) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const { connectWallet, currentAccount } = useContext(MetamaskProvider);

  const fullname = props.fullname || "";
  const onFullnameChange = props.onFullnameChange || "";
  const email = props.email || "";
  const onEmailChange = props.onEmailChange || "";
  const password = props.password || "";
  const onPasswordChange = props.onPasswordChange || "";
  const onSubmit = props.onSubmit;

  useEffect(() => {
    updateCanSubmit();
  }, [fullname, email, password, currentAccount]);

  const updateCanSubmit = () => {
    setCanSubmit(
      fullname !== "" && email !== "" && password !== "" && currentAccount !== ""
    );
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
          {currentAccount !== "" ? (
            <div>{currentAccount}</div>
          ) : (
            <div>
              <Button
                className="w-full"
                type="primary"
                style={{ backgroundColor: "green" }}
                shape="round"
                icon={<ApiOutlined />}
                onClick={connectWallet}
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

export default SignupForm;
