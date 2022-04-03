import React from "react";
import { Row, Col, Typography, Collapse, Spin } from "antd";
import { useGetExchangesQuery } from "../services/cryptoApi";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchanges = data?.data?.exchanges;
  const { Title, Text } = Typography;
  const { Panel } = Collapse;
  if (isFetching)
    return (
      <Spin
        tip="Loading"
        style={{
          marginTop: "5%",
          marginLeft: "50%",
          transform: "translateX(-50%)",
        }}
      />
    );
  return (
    <div>
      <Row>
        <Col span={6}>
          <Title level={5}>Exchanges</Title>
        </Col>
        <Col span={6}>
          <Title level={5}>24h Trade Volume</Title>
        </Col>
        <Col span={6}>
          {" "}
          <Title level={5}>Markets</Title>
        </Col>
        <Col span={6}>
          <Title level={5}>Change</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse>
            <Panel
              showArrow={false}
              header={<Title level={5}>Important Message!</Title>}
            >
              <Text>
                Can not access the exchanges endpoint of the api due to lack of
                premium subscription!
              </Text>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default Exchanges;
