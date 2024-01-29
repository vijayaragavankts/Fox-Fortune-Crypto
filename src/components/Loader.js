import React from "react";
import { Spin } from "antd";
import { Flex, Box } from "@chakra-ui/react";

const Loader = () => (
  <Flex height="100vh" width="70vw" alignItems="center" justifyContent="center">
    <Box>
      <Spin size="large" align="center" />
    </Box>
  </Flex>
  // <Flex
  //   alignItems="center"
  //   justifyContent="center"
  //   minHeight="100vh" // Set the minimum height of the container to 100% of the viewport height
  //   // minWidth="100vw" // Center the content horizontally
  // >
  //   <CircularProgress
  //     isIndeterminate
  //     color="red.400"
  //     size="100px"
  //     thickness="1px"
  //   />
  // </Flex>
);

export default Loader;
