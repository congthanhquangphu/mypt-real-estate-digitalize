import React, { useState } from "react";
import { Button, Input } from "antd";
import { UserOutlined, MailOutlined, LoginOutlined } from "@ant-design/icons";

const SignupPage = () => {
  return (
    <div className="p-4 bg-white rounded-xl ">
      <h1>Registry form</h1>
      <hr className="mt-2 mb-2" />
      <form>
        <div className="m-2 grid grid-cols-2 gap-y-2">
          <div>Fullname:</div>
          <div>
            <Input
              size="large"
              placeholder="Full name"
              prefix={<UserOutlined />}
            />
          </div>
          <div>Email:</div>
          <div>
            <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
          </div>
          <div>Password:</div>
          <div>
            <Input.Password placeholder="Your password" />
          </div>
          <div>Wallet:</div>
          <div className="flex justify-center">
            <Button
              type="primary"
              shape="round"
              icon={<LoginOutlined />}
            >
              Connect
            </Button>
          </div>
        </div>
        <Button type="primary" shape="round" className="center w-full">
          Registry
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
