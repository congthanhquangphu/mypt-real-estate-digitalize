import React, { useContext } from "react";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { MetamaskProvider, MetamaskContext } from "context/MetamaskProvider";
import { ApiOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import MetamaskButton from "components/MetamaskButton";

const menuItem = [
  "Home",
  "User",
  "Marketplace",
  "Estate registry",
  "About us",
].map((key) => ({
  key: key.replace(" ", "_").toLowerCase(),
  label: key,
}));

const Header = () => {
  let navigate = useNavigate();

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <header className="flex justify-between flex-row items-center">
      <div className="mt-5 w-full">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItem}
          onClick={(item) => navigate(`/${item.key}`)}
        />
      </div>
      {/* {localStorage.token == null ? (
        <div className="p-2 flex flex-row">
          <Button
            className="m-2"
            type="default"
            shape="round"
            onClick={() => navigate("/login")}
            icon={<LoginOutlined />}
          >
            Login
          </Button>
          <Button
            className="m-2"
            type="default"
            onClick={() => navigate("/signup")}
            shape="round"
            icon={<FormOutlined />}
          >
            Sign up
          </Button>
        </div>
      ) : (
        <div className="p-2 flex flex-row">
          <Button
            className="m-2"
            type="default"
            onClick={(e) => {
              navigate("/account");
            }}
            shape="round"
            icon={<UserOutlined />}
          >
            Account
          </Button>
          <Button
            className="m-2"
            type="default"
            onClick={logout}
            shape="round"
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </div>
      )} */}
      <MetamaskButton className="m-2"/>
    </header>
  );
};

export default Header;
