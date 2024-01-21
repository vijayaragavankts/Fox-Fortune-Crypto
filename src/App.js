import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import { Flex } from "@chakra-ui/react";

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
        </Routes>
      </Flex>
    </>
  );
}

export default App;
