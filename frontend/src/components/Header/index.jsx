import React, { useContext } from "react";
import {
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router";
import MetamaskButton from "components/MetamaskButton";

const getItem = (label, key, icon, children, theme) => {
  return {
    key,
    icon,
    children,
    label,
    theme,
  };
};

const menuItem = [
  getItem("Home", "home"),
  getItem("User", "user"),
  getItem("Marketplace", "marketplace", null, [
    getItem("Listing", "listing"),
    getItem("Crowdfunding", "crowdfunding"),
    getItem("Bidding", "bidding"),
    getItem("Swap", "swap"),
  ]),
  getItem("Estate registry", "estate_registry"),
  getItem("Token", "token"),
  // getItem("About us", "about_us"),
];

const Header = (props) => {
  let navigate = useNavigate();
  const className = props.className || "";

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <header
      className={`${className} flex ant-menu ant-menu-dark justify-between flex-row items-center`}
    >
      <div className="mt-5 w-full">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItem}
          theme="dark"
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
      <MetamaskButton className="m-2" />
    </header>
  );
};

export default Header;
