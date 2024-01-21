import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

const CryptoCard = ({
  rank,
  id,
  image,
  currentPrice,
  marketCap,
  priceChange,
}) => (
  <Box
    bg="white"
    p={4}
    borderRadius="md"
    boxShadow="md"
    mb={10}
    mx={5} // Adjust margin as needed
    w="300px" // Adjust width as needed
  >
    <Flex align="center" justifyContent="space-between">
      <Text fontSize="lg" fontWeight={600} mr={2}>
        {rank}
      </Text>

      <Text ml={2} fontSize="lg" fontWeight={700}>
        {id}
      </Text>
      <Image src={image} boxSize={10} alt={id} />
    </Flex>
    <Text fontSize="lg" fontWeight={600} color="grey" mt={2}>
      Price:{" "}
      <Text as="span" color="black">
        ${currentPrice}
      </Text>
    </Text>
    <Text fontSize="lg" fontWeight={600} color="grey" mt={2}>
      Market Cap:{" "}
      <Text as="span" color="black">
        ${marketCap}
      </Text>
    </Text>
    <Text fontSize="lg" fontWeight={600} color="grey" mt={2}>
      24h Change:{" "}
      <Text as="span" color="black">
        ${priceChange}
      </Text>
    </Text>
  </Box>
);

const Homepage = () => {
  const [globaldata, setGlobalData] = useState({
    totalCrypto: 0,
    totalExchange: 0,
    totalMarketCap: 0,
    marketcap_24h: 0,
  });
  const [cryptoData, setCryptoData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // fetching global stats
    const fetchGlobal = async () => {
      try {
        const { data } = await axios.get("/global");
        console.log(data.data);
        const totalCrypto = data?.data?.active_cryptocurrencies;
        const totalExchange = data?.data?.markets;
        const totalMarketCap = data?.data?.updated_at;
        const marketcap_24h = data?.data?.market_cap_change_percentage_24h_usd;
        setGlobalData({
          totalCrypto,
          totalExchange,
          totalMarketCap,
          marketcap_24h,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGlobal();

    // fetching top cypto stats
    const fetchTopCrypto = async () => {
      try {
        const { data } = await axios.get(
          "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
        );
        console.log(data);
        setCryptoData(data);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // Handle rate limit exceeded
          console.log("API rate limit exceeded. Retry after a delay.");
        } else {
          // Handle other errors
          console.error("Error fetching data:", error.message);
        }
      }
    };

    fetchTopCrypto();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const formatNumber = (number) => {
    if (number >= 1e3 && number < 1e6) {
      return (number / 1e3).toFixed(1) + "K";
    } else if (number >= 1e6 && number < 1e9) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    }
    return number.toString();
  };

  const formatTotalMarketCap = (number) => {
    if (number >= 1e3 && number < 1e6) {
      return (number / 1e3).toFixed(1) + "K";
    } else if (number >= 1e6 && number < 1e9) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "T";
    }
    return number.toString();
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <>
      <Flex
        direction="column"
        ml={{ base: 25, md: 350 }}
        mt={{ base: 100, md: 5 }}
      >
        <Text fontSize="1.8em" fontWeight={500} color="#333" mt="">
          Global Crypto Statistic
        </Text>
        {/* here i want a grid like structure, each row will have max of two column, 1st will have total cryptocurrencies and its value vertically, 2nd will have total exchanges and its value vertically */}
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={6}
          alignItems="center"
          justifyContent="space-between"
        >
          <GridItem>
            <Text color="grey" mt="3" fontSize="md">
              Total Cryptocurrencies
            </Text>
            <Text color="#333" fontSize="3xl">
              {formatNumber(globaldata.totalCrypto)}
            </Text>
          </GridItem>
          <GridItem ml={{ base: 10, md: 160 }}>
            <Text color="grey" mt="3" fontSize="md">
              Total Exchanges
            </Text>
            <Text color="#333" fontSize="3xl">
              {formatNumber(globaldata.totalExchange)}
            </Text>
          </GridItem>
          <GridItem>
            <Text color="grey" mt="3" fontSize="md">
              Total Market Capital
            </Text>
            <Text color="#333" fontSize="3xl">
              {formatTotalMarketCap(globaldata.totalMarketCap)}
            </Text>
          </GridItem>
          <GridItem ml={{ base: 10, md: 160 }}>
            <Text color="grey" mt="3" fontSize="md">
              Market Cap 24h change
            </Text>
            <Text color="#333" fontSize="3xl">
              {formatPercentage(globaldata.marketcap_24h)}
            </Text>
          </GridItem>
        </Grid>
        <Text fontSize="1.8em" fontWeight={500} color="#333" mt="4" mb="4">
          Top 10 Crypto Currency
        </Text>
        <Flex
          direction="row"
          align="center"
          justify="center"
          flexWrap="wrap" // Allow cards to wrap to the next line
        >
          <Grid
            templateColumns={{
              base: "1fr", // Full width on small screens
              md: "repeat(2, 1fr)", // Two columns on medium screens
              lg: "repeat(3, 1fr)", // Three columns on larger screens
            }}
            gap={4}
            autoFlow="row" // This property allows items to be placed in rows
          >
            {cryptoData &&
              cryptoData.map((element, idx) => (
                <GridItem key={idx}>
                  <CryptoCard
                    rank={idx + 1}
                    id={element.name}
                    image={element.image}
                    currentPrice={formatNumber(element.current_price)}
                    marketCap={formatNumber(element.market_cap)}
                    priceChange={formatPercentage(
                      element.price_change_percentage_24h
                    )}
                  />
                </GridItem>
              ))}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
export default Homepage;
