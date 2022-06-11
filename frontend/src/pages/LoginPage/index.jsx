import React, { useState } from "react";
import { message as AntMessage } from "antd";
import { sha256 } from "js-sha256";
import { useNavigate } from "react-router";
import LoginForm from "components/LoginForm";
import * as account from "services/account.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    const data = {
      email: email,
      password: sha256(password),
    };
    account.login(data, (err, res) => {
      if (err) {
        AntMessage.error("Request fail");
        return;
      }

      const data = res.data;
      const exitcode = data.exitcode;
      const message = data.message;
      if (exitcode === 0) {
        AntMessage.success(message);
        localStorage.setItem("token", data.token);
        navigator("/account");
      } else {
        AntMessage.error(message);
      }
    });
  };

  return (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginPage;
