import React from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Typography, Row, Col, Statistic } from "antd";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  if (!isFetching) {
    console.log(data.data.stats);
  }
  const { Title } = Typography;
  const globalStats = data?.data?.stats;
  return (
    <>
      <Title level={2}>Global Crypto Stats</Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
