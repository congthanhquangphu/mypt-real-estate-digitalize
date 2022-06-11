import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = (props) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const email = props.email || "";
  const password = props.password || "";
  const onEmailChange = props.onEmailChange;
  const onPasswordChange = props.onPasswordChange;
  const onSubmit = props.onSubmit;

  useEffect(() => {
    updateCanSubmit();
  }, [email, password]);

  const updateCanSubmit = () => {
    setCanSubmit(email !== "" && password !== "");
  };

  return (
    <div className="p-4 bg-white rounded-xl ">
      <h1>Login form</h1>
      <hr className="mt-2 mb-2" />
      <div>
        <div className="m-2">
          <Input
            size="large"
            onChange={onEmailChange}
            value={email}
            placeholder="Email"
            prefix={<MailOutlined />}
          />
        </div>
        <div className="m-2">
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            size="large"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="m-2">
          <Button
            type="primary"
            disabled={!canSubmit}
            shape="round"
            className="center w-full"
            onClick={onSubmit}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
