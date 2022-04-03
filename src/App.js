import React from "react";
import "./App.css";
import {
  Currencies,
  Homepage,
  Navbar,
  Exchanges,
  News,
  CryptoDetails,
} from "./components";
import { Typography, Layout, Space } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import useTitle from "./hooks/useTitle";

const App = () => {
  useTitle("Cryptoverse");
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Currencies />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/news" element={<News />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography style={{ color: "#fff", textAlign: "center" }}>
            &copy; Cryptoverse 2021 - {new Date().getFullYear()}
            <br />
            All rights reserved!
          </Typography>

          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
