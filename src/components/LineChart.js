import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import * as usertz from "user-timezone";

const CoinLineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      usertz.datetime(
        coinHistory?.data?.history[i].timestamp,
        timePeriod === "3h" || timePeriod === "24h"
          ? "h:mm A"
          : timePeriod === "1y" || timePeriod === "3y" || timePeriod === "5y"
          ? "MM-DD-YYYY"
          : "MM-DD"
      )
    );
  }

  coinPrice.reverse();
  coinTimestamp.reverse();

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "green",
        borderColor: "green",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
      >
        <Text
          textColor="green.400"
          fontSize="2xl"
          fontWeight="700"
          mt="5"
          mb="3"
        >
          {coinName} Price Chart
        </Text>
        <Text mt="5" mb="3" fontWeight="700" fontSize="xl">
          Change: {coinHistory?.data?.change}%
        </Text>
        <Text mt="5" mb="3" fontWeight="700" fontSize="xl">
          Current {coinName} Price: $ {currentPrice}
        </Text>
      </Flex>
      <Line data={data} options={options} />
    </>
  );
};

export default CoinLineChart;
