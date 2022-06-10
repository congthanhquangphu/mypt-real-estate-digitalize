import React, { useState } from "react";
import { Button, Input, message as AntMessage } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import api from "../../utils/api";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const navigator = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    updateCanSubmit();
  }, [email, password]);

  const updateCanSubmit = () => {
    setCanSubmit(email !== "" && password !== "");
  };

  const onSubmit = () => {
    const data = {
      email: email,
      password: sha256(password),
    };
    api
      .post("/account/login", data)
      .then((res) => {
        const data = res.data;
        const exitcode = data.exitcode;
        const message = data.message;
        if (exitcode === 0) {
          AntMessage.success(message);
          localStorage.setItem("token", data.token);
          navigator("/");
        } else {
          AntMessage.error(message);
        }
      })
      .catch((err) => {
        console.log(err);
        AntMessage.error("Request fail");
      });
  };

  return (
    <div className="p-4 bg-white rounded-xl ">
      <h1>Login form</h1>
      <hr className="mt-2 mb-2" />
      <form>
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
      </form>
    </div>
  );
};

export default LoginPage;
