import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Homepage = lazy(() => import("./components/Homepage"));
const Navbar = lazy(() => import("./components/Navbar"));
const SingleCoin = lazy(() => import("./components/SingleCoin"));
const CryptoCard = lazy(() => import("./components/CryptoCard"));

function App() {
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }}>
        <Suspense fallback={<Loader />}>
          <Navbar />
        </Suspense>

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
                <Suspense fallback={<Loader />}>
                  <Homepage />
                </Suspense>
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
                <Suspense fallback={<Loader />}>
                  <SingleCoin />
                </Suspense>
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
                <Suspense fallback={<Loader />}>
                  <CryptoCard />
                </Suspense>
              </Flex>
            }
          />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
