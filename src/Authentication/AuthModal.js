import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

const AuthModal = ({ isMenuOpen, setIsMenuOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    return () => {
      onClose(); // Close the modal when the component unmounts
    };
  }, [onClose]); // Include onClose in the dependency array

  const handleOpen = () => {
    onOpen();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast({
          title: `Sign up Successful. Welcome ${res.user.email}`,
          duration: 3000,
          status: "success",
          isClosable: true,
          position: "bottom",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error Occurred",
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <HStack>
      <Button
        onClick={handleOpen}
        rightIcon={<AiOutlineLogin size={20} mr="0" />}
        colorScheme="blue"
        mb={5}
      >
        <Text fontSize={18}> Login </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            direction="column"
            bg="white"
            w="100%"
            p={4}
            pb={0}
            borderRadius="lg"
            borderWidth="1px"
            justifyContent="center"
          >
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab width="50%"> Login </Tab>
                <Tab width="50%"> Sign Up </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <Signup onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Text mb={3} mt={-2}>
                OR
              </Text>
              <GoogleButton
                style={{
                  width: "85%",
                  outline: "none",
                  marginBottom: 20,
                }}
                onClick={handleSignInWithGoogle}
              />
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </HStack>
  );
};

export default AuthModal;
