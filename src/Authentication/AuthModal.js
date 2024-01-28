import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMultiStyleConfig,
  useTab,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({ isMenuOpen, setIsMenuOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HStack>
      <Icon as={AiOutlineLogin} boxSize="6" mr="0" />
      <Text onClick={handleOpen}>Login</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            direction="column"
            bg="white"
            w="100%"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            justifyContent="center"
          >
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab width="50%"> Login </Tab>
                <Tab width="50%"> Sign Up </Tab>
              </TabList>{" "}
              <TabPanels>
                <TabPanel>
                  <Login onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <Signup onClose={onClose} />
                </TabPanel>{" "}
              </TabPanels>{" "}
            </Tabs>{" "}
          </Flex>{" "}
        </ModalContent>
      </Modal>
    </HStack>
  );
};
export default AuthModal;
