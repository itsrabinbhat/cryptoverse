import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { Spin, Typography, Select, Row, Col } from "antd";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery({
    coinId,
  });

  console.log(timeperiod);

  const { data: cryptoHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const { Title, Text } = Typography;
  const { Option } = Select;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (isFetching)
    return (
      <Spin
        tip="Loading"
        style={{
          marginTop: "10%",
          marginLeft: "50%",
        }}
      />
    );

  console.log(cryptoDetails, cryptoHistory);

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.data?.coin.name} ({cryptoDetails?.data?.coin.symbol})
          Price
        </Title>
        <p>
          {cryptoDetails?.data?.coin.name} Live price in US Dollar (USD). View
          value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        defaultValue="7d"
        onChange={(value) => setTimeperiod(value)}
      >
        {time?.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>

      <LineChart
        cryptoHistory={cryptoHistory}
        cryptoName={cryptoDetails?.data?.coin.name}
        currentPrice={cryptoDetails.data.coin.price}
      />
    </Col>
  );
};

export default CryptoDetails;
