import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import htmlreactparser from "html-react-parser";
import LineChart from "./LineChart";
import { Box, Flex, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const SingleCoin = () => {
  const { id } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [coinHistory, setCoinHistory] = useState(null);
  const [isFetchingDetails, setIsFetchingDetails] = useState(true);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);

  const { data: detailsData, isFetching: detailsFetching } =
    useGetCryptoDetailsQuery(id);
  const { data: historyData, isFetching: historyFetching } =
    useGetCryptoHistoryQuery({ id, timePeriod });

  console.log(detailsFetching, historyFetching);

  useEffect(() => {
    if (detailsData) {
      setCryptoDetails(detailsData?.data?.coin);
      setIsFetchingDetails(false);
    }
  }, [detailsData]);

  useEffect(() => {
    if (historyData) {
      setCoinHistory(historyData);
      setIsFetchingHistory(false);
    }
  }, [historyData]);

  const time = ["24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  if (isFetchingDetails || isFetchingHistory) return <Loader />;

  if (!cryptoDetails) return <div>Crypto details not available.</div>;

  // const handleTimePeriodChange = (value) => {
  //   setTimePeriod(value);
  // };

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Flex
      direction="column"
      ml={{ base: 25, md: 350 }}
      mt={{ base: 100, md: 5 }}
      width={{ base: "80vw", md: "50vw", lg: "70vw" }}
    >
      <Text
        fontSize="5xl"
        fontWeight={900}
        color="#333"
        mt=""
        margin="auto"
        textColor="green.400"
      >
        {cryptoDetails?.name}
      </Text>
      <Text margin="auto" mt="5" mb="5">
        {cryptoDetails?.name} live price in US Dollars. View value statistic,
        market cap, and supply.
      </Text>

      <hr style={{ width: "100%" }} />

      <Select
        defaultValue="7d"
        variant="filled"
        onChange={(value) => setTimePeriod(value)}
        mt="5"
        className="custom-select"
      >
        {time.map((e, index) => (
          <Option key={index} value={e}>
            {e}
          </Option>
        ))}
      </Select>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={
          cryptoDetails.price < 0.01 && cryptoDetails.price > 0.001
            ? millify(cryptoDetails.price, { precision: 4 })
            : cryptoDetails.price < 0.001
            ? millify(cryptoDetails.price, { precision: 5 })
            : cryptoDetails.price < 1000
            ? millify(cryptoDetails.price, { precision: 2 })
            : millify(cryptoDetails.price)
        }
        coinName={cryptoDetails?.name}
        timePeriod={timePeriod}
      />

      <Flex direction={{ base: "column", lg: "row" }}>
        <Flex direction="column" mr={{ base: "", md: "10" }}>
          <Text
            textColor="green.400"
            fontSize="2xl"
            fontWeight="700"
            mt="5"
            mb="3"
          >
            {cryptoDetails?.name} Value statistic
          </Text>
          <Text mb="10">
            An overview showing the statistics of {cryptoDetails?.name}, such as
            the base and quote currency, the rank, and trading volume.
          </Text>
          <Table variant="simple" mb="10">
            <Tbody>
              {stats.map(({ title, icon, value }, index) => (
                <Tr
                  key={index}
                  height="65px"
                  _hover={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Td>
                    <Flex align="center" justify="flex-start">
                      {" "}
                      {/* Align content to the start */}
                      <Box mr="2">{icon}</Box>
                      <Text>{title}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" justify="flex-end">
                      {" "}
                      {/* Align content to the end */}
                      <Text fontWeight="700" fontSize="lg">
                        {value}
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Flex direction="column">
          <Text
            textColor="green.400"
            fontSize="2xl"
            fontWeight="700"
            mt="5"
            mb="3"
          >
            Other Stats Info
          </Text>
          <Text mb="10">
            An overview showing the statistics related to {cryptoDetails?.name},
            such as the number of markets and number of exchanges
          </Text>
          <Table variant="simple">
            <Tbody>
              {genericStats.map(({ title, icon, value }, index) => (
                <Tr
                  key={index}
                  height="65px"
                  _hover={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Td>
                    <Flex align="center" justify="flex-start">
                      {" "}
                      {/* Align content to the start */}
                      <Box mr="2">{icon}</Box>
                      <Text>{title}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" justify="flex-end">
                      {" "}
                      {/* Align content to the end */}
                      <Text fontWeight="700" fontSize="lg">
                        {value}
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Flex
          mr={{ base: "", md: "10" }}
          mb={{ base: "10", lg: "0" }} // Add margin bottom for small screens
          direction="column"
          flex="1" // Make the flex item grow to fill the available space
        >
          <Text
            textColor="green.400"
            fontSize="2xl"
            fontWeight="700"
            mt="5"
            mb="3"
          >
            What is {cryptoDetails?.name}
          </Text>
          {htmlreactparser(cryptoDetails?.description)}
        </Flex>
        <Flex
          direction="column"
          flex="1" // Make the flex item grow to fill the available space
        >
          <Text
            textColor="green.400"
            fontSize="2xl"
            fontWeight="700"
            mt="5"
            mb="3"
          >
            {cryptoDetails?.name} Links
          </Text>
          <Table variant="simple">
            <Tbody>
              {cryptoDetails.links?.map((e, index) => (
                <Tr
                  key={index}
                  height="65px"
                  _hover={{
                    backgroundColor: "#f0f0f0",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Td>
                    <Flex align="center" justify="flex-start">
                      {" "}
                      {/* Align content to the start */}
                      <Text textTransform="capitalize">{e.type}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" justify="flex-end">
                      {" "}
                      {/* Align content to the end */}
                      <Text fontStyle="italic" fontSize="lg">
                        <a href={e.url}>{e.name}</a>
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SingleCoin;
