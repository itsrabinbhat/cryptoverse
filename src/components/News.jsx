import React, { useState } from "react";
import { Typography, Row, Col, Card, Avatar, Select, Spin } from "antd";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";

const News = ({ simplified }) => {
  const [category, setCategory] = useState("Cryptocurrenct");
  const { data: newsList, isFetching } = useGetCryptoNewsQuery({
    category,
    count: simplified ? 6 : 12,
  });
  const { data: cryptoList } = useGetCryptosQuery(100);
  const { Text, Title } = Typography;
  const { Option } = Select;
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  console.log(newsList);

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
  return (
    <>
      {simplified ? (
        ""
      ) : (
        <div className="select-container">
          <Typography.Title
            level={3}
            style={{ color: "#fff", marginTop: "8px" }}
          >
            Explore Latest Crypto News
          </Typography.Title>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {cryptoList?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </div>
      )}
      <Row gutter={[16, 16]} className="crypto-news-container">
        {newsList?.value?.map((news, idx) => (
          <Col xs={24} xm={12} lg={8} key={idx}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <Card hoverable className="news-card">
                <div
                  className="news-image-container"
                  style={{
                    backgroundImage: `url(${
                      news?.image?.thumbnail?.contentUrl || demoImage
                    })`,
                  }}
                >
                  <Title
                    level={5}
                    className="news-title"
                    style={{ color: "#fff" }}
                  >
                    {news.name}
                  </Title>
                </div>
                <p>
                  {news.description.length > 150
                    ? news.description.substring(0, 150) + "..."
                    : news.description}
                </p>
                <span
                  style={{
                    display: "block",
                    marginTop: "-5px",
                    marginBottom: "10px",
                    color: "blue",
                  }}
                >
                  Read More
                </span>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text
                      className="provider-name"
                      style={{
                        fontSize: "12px",
                        opacity: ".9",
                      }}
                    >
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text
                    style={{
                      fontSize: "12px",
                      opacity: ".8",
                    }}
                  >
                    {moment(news.datePublished).fromNow()}
                  </Text>
                </div>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
