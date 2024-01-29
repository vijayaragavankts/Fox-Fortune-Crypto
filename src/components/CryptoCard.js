import {
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const CryptoCard = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  let cryptos = cryptoList?.data?.coins;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(cryptos);
  const navigate = useNavigate();

  useEffect(() => {
    if (cryptoList) {
      const filteredData = cryptoList.data.coins.filter(
        (coin) =>
          coin.name &&
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      //   console.log(filteredData);
      cryptos = filteredData;
      setData(filteredData);
    }
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }

  const handleSinglePage = (id) => {
    navigate(`/single/${id}`);
  };

  return (
    <>
      {!simplified && (
        <div>
          <InputGroup mt={{ base: 100, md: 4 }} mb={4} mx="auto" maxW="400px">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              placeholder="Search Cryptocurrencies"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              borderRadius="md"
              _focus={{
                borderColor: "teal.500",
                boxShadow: "0 0 0 1px teal.500",
              }}
            />
          </InputGroup>
        </div>
      )}
      <Flex direction="row" align="center" justify="center" flexWrap="wrap">
        <Grid
          templateColumns={{
            base: "1fr", // Full width on small screens
            md: "repeat(1, 1fr)", // Two columns on medium screens
            lg: "repeat(2, 1fr)", // Three columns on larger screens
            xl: "repeat(3, 1fr)",
          }}
          gap={4}
          autoFlow="row"
        >
          {data?.map((Currency, idx) => (
            <GridItem key={idx}>
              <Flex
                bg="white"
                p={4}
                borderRadius="md"
                boxShadow="md"
                mb={10}
                mx={5}
                direction={{ base: "column", md: "row" }}
                alignItems={{ base: "center", md: "flex-start" }}
                textAlign="center"
                transition="transform 0.1s ease-in-out, box-shadow 0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "xl",
                }}
                cursor="pointer"
                onClick={() => handleSinglePage(Currency.uuid)}
              >
                <Flex direction="column">
                  <Text
                    fontSize="2xl"
                    fontWeight={500}
                    mb={{ base: 2, md: 0 }}
                    flex="1"
                    justifyContent="center"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {Currency.name.split(" ").slice(0, 2).join(" ")}
                  </Text>
                  <Image
                    src={Currency.iconUrl}
                    boxSize={20}
                    alt={Currency.name}
                    mb={{ base: 2, md: 0 }}
                    mr={4}
                    ml={4}
                  />
                  <Text
                    fontSize="md"
                    fontWeight={600}
                    color="gray"
                    mt={2}
                    ml={0}
                  >
                    Rank:{" "}
                    <Text as="span" color="black" fontWeight={600}>
                      {Currency.rank}
                    </Text>
                  </Text>
                </Flex>

                <Flex direction="column" flex="2" mt={{ base: "", md: "4" }}>
                  <Text fontSize="md" fontWeight={600} color="gray" mt={2}>
                    Price:{" "}
                    <Text as="span" color="black" fontWeight={600}>
                      ${millify(Currency.price)}
                    </Text>
                  </Text>
                  <Text fontSize="md" fontWeight={600} color="gray" mt={2}>
                    Market Cap:{" "}
                    <Text as="span" color="black" fontWeight={600}>
                      ${millify(Currency.marketCap)}
                    </Text>
                  </Text>
                  <Text fontSize="md" fontWeight={600} color="gray" mt={2}>
                    24h Change:{" "}
                    <Text
                      as="span"
                      color={Currency.change >= 0 ? "green" : "red"}
                      fontWeight="700"
                    >
                      {Currency.change}%
                    </Text>
                  </Text>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
};

export default CryptoCard;
