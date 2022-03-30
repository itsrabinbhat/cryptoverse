import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input, Typography } from "antd";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Title } from "chart.js";

const Currencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const filteredCryptos = cryptoList?.data?.coins?.filter((crypto) =>
      crypto.name.toLowerCase().includes(keyword)
    );

    setCryptos(filteredCryptos);
  }, [cryptoList, keyword]);

  return (
    <>
      {simplified ? (
        ""
      ) : (
        <div className="search-container">
          <Typography.Title level={3} style={{ color: "#fff" }}>
            Most Popular Cryptos In The World!
          </Typography.Title>
          <div className="search-crypto">
            <Input
              placeholder="Search For Crypto..."
              onChange={(e) => setKeyword(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      )}
      <Row gutter={[16, 16]} className="crypto-card-container">
        {isFetching
          ? "Loading..."
          : cryptos?.map((currency) => (
              <Col
                key={currency.id}
                xs={24}
                xm={12}
                lg={8}
                className="crypto-card"
              >
                <Link to={`/crypto/${currency.uuid}`}>
                  <Card
                    title={`${currency.rank}.${currency.name}`}
                    extra={
                      <img src={currency.iconUrl} className="crypto-image" />
                    }
                    hoverable
                  >
                    <p>Price: ${millify(currency.price)}</p>
                    <p>Market Cap: ${millify(currency.marketCap)}</p>
                    <p>Daily Change: {millify(currency.change)}%</p>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
    </>
  );
};

export default Currencies;
