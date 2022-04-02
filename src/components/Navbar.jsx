import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Typography, Avatar, Button } from "antd";
import iconSrc from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  // const [activeScroll, setActiveScroll] = useState(false);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    // const handleScroll = () => setActiveScroll(true);
    window.addEventListener("resize", handleResize);
    // window.addEventListener("scroll", () => handleScroll);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      // window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={iconSrc} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
          style={{
            backgroundColor: "transparent",
            color: "#fff",
          }}
        >
          <MenuOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
