import React from "react";
import { LoginOutlined, LogoutOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router";

const menuItem = ["Home", "Real estate", "About us"].map((key) => ({
  key: key.replace(" ", "_").toLowerCase(),
  label: key,
}));

const Header = () => {
  let navigate = useNavigate();

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
      <div className="p-2 flex flex-row">
        <Button
          className="m-2"
          type="default"
          shape="round"
          onClick={()=>navigate("/login")}
          icon={<LoginOutlined />}
        >
          Login
        </Button>
        <Button
          className="m-2"
          type="default"
          onClick={()=>navigate("/signup")}
          shape="round"
          icon={<FormOutlined />}
        >
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default Header;
