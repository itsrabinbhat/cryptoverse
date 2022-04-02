import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import millify from "millify";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ cryptoHistory, cryptoName, currentPrice }) => {
  const { Title } = Typography;
  const cryptoPrice = [];
  const priceTimeline = [];

  for (let i = 0; i < cryptoHistory?.data?.history?.length; i += 1) {
    cryptoPrice.push(cryptoHistory?.data?.history[i].price);
    priceTimeline.push(
      new Date(
        cryptoHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: priceTimeline,
    datasets: [
      {
        label: "Price In USD",
        data: cryptoPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  return (
    <Row className="chart-header">
      <Title level={2} className="chart-title">
        {cryptoName} Price Chart
      </Title>
      <Col className="price-container">
        <Title level={5} className="price-change">
          Change: {cryptoHistory?.data?.change}%
        </Title>
        <Title level={5} className="current-price">
          Current {cryptoName} Price: $ {millify(currentPrice)}
        </Title>
      </Col>
      <Line data={data} />
    </Row>
  );
};

export default LineChart;
