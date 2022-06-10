import React, { useState } from "react";
import { Button, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-4 bg-white rounded-xl ">
      <h1>Login form</h1>
      <hr className="mt-2 mb-2" />
      <form>
        <div className="m-2">
          <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
        </div>
        <div className="m-2">
          <Input.Password
            placeholder="Password"
            size="large"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="m-2">
          <Button type="primary" shape="round" className="center w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
