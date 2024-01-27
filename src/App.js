import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Flex } from "@chakra-ui/react";
import SingleCoin from "./components/SingleCoin";
import CryptoCard from "./components/CryptoCard";

function App() {
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Flex
                direction="column"
                ml={{ base: 0, md: "2" }}
                p="4"
                width={{ base: "100%", md: "auto" }}
              >
                {/* Adjust ml (margin-left) based on Navbar width */}
                <Homepage />
              </Flex>
            }
          />
          <Route
            path="/single/:id"
            element={
              <Flex
                direction="column"
                ml={{ base: 0, md: "2" }}
                p="4"
                width={{ base: "100%", md: "auto" }}
              >
                <SingleCoin />
              </Flex>
            }
          />
          <Route
            path="/cryptocurrency"
            element={
              <Flex
                direction="column"
                mt="2"
                ml={{ base: 0, md: "290" }}
                p="4"
                width={{ base: "100%", md: "auto" }}
              >
                <CryptoCard />
              </Flex>
            }
          />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
