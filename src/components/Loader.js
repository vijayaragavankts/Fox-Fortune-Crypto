import React from "react";
import { Spin } from "antd";
import { Flex, Box } from "@chakra-ui/react";

const Loader = () => (
  <Flex height="100vh" width="60vw" alignItems="center" justifyContent="center">
    <Box>
      <Spin size="large" />
    </Box>
  </Flex>
);

export default Loader;
