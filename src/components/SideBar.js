import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";

import { useSelector } from "react-redux";
import { auth } from "../firebase";

function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const userDetails = useSelector((state) => state.user.userDetails);
  const toast = useToast();

  const handleOpen = () => {
    onOpen();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(auth);
    toast({
      title: "Logout Successful !",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
    onClose();
  };

  return (
    <>
      <Avatar
        mb={4}
        onClick={handleOpen}
        name={userDetails.displayName || userDetails.email}
        src={userDetails.photoURL}
        alt={userDetails.displayName || userDetails.email}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Flex direction="column" alignItems="center">
              <Avatar
                mb={4}
                name={userDetails.displayName || userDetails.email}
                src={userDetails.photoURL}
                alt={userDetails.displayName || userDetails.email}
                size="2xl"
              />
              <Text>{userDetails.displayName || userDetails.email}</Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {/* <Flex
              mt={10}
              alignItems="center"
              //   justifyContent="center"
              flex={1}
              width="100%"
              backgroundColor="gray.200"
              borderRadius={10}
              p={15}
              pt={10}
              gap={12}
              direction="column"
              overflowY="scroll"
              minHeight="400px"
            >
              <Text
                fontSize={15}
                fontFamily="monospace"
                textShadow="0 0 1px black"
              >
                WishList
              </Text>
            </Flex> */}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button colorScheme="red" onClick={handleLogout} width="100%">
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default SideBar;
