import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React, { lazy, Suspense } from "react";

import Loader from "./Loader";

import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";

const CryptoCard = lazy(() => import("./CryptoCard"));

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  console.log(data);

  const globalStats = data?.data?.stats;

  if (isFetching) {
    return <Loader />;
  }

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
              {millify(
                globalStats?.total || 0
                // globaldata.totalCrypto || localStorage.getItem("totalCrypto")
              )}
            </Text>
          </GridItem>
          <GridItem ml={{ base: 10, md: 160 }}>
            <Text color="grey" mt="3" fontSize="md">
              Total Exchanges
            </Text>
            <Text color="#333" fontSize="3xl">
              {millify(globalStats?.totalExchanges)}
            </Text>
          </GridItem>
          <GridItem>
            <Text color="grey" mt="3" fontSize="md">
              Total Market Cap
            </Text>
            <Text color="#333" fontSize="3xl">
              {millify(globalStats?.totalMarketCap)}
            </Text>
          </GridItem>
          <GridItem ml={{ base: 10, md: 160 }}>
            <Text color="grey" mt="3" fontSize="md">
              Total 24h Volume
            </Text>
            <Text color="#333" fontSize="3xl">
              {millify(globalStats?.total24hVolume)}
            </Text>
          </GridItem>
        </Grid>
        <Text fontSize="1.8em" fontWeight={500} color="#333" mt="4" mb="4">
          Top 10 Cryptocurrencies
        </Text>
        <Suspense fallback={<Loader />}>
          <CryptoCard simplified />
        </Suspense>
      </Flex>
    </>
  );
};
export default Homepage;
