import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { Currencies } from "./index";
import News from "./News";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  const { Title } = Typography;
  const globalStats = data?.data?.stats;
  return (
    <>
      <Title level={2}>Global Crypto Stats</Title>
      {isFetching ? (
        <Spin
          tip="Loading"
          style={{
            marginTop: "5%",
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        />
      ) : (
        <Row>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats?.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats?.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats?.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats?.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats?.totalMarkets)}
            />
          </Col>
        </Row>
      )}

      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 Cryptos In The World
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show more...</Link>
        </Title>
      </div>
      <Currencies simplified />
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news">Show more...</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
};

export default Homepage;
