import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Enter all the fields !",
        status: "warning",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password not match !",
        status: "warning",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast({
        title: `Sign Up Successful. Welcome ${result.user.email}`,
        status: "success",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Occured !",
        description: `Error: ${err.message}`,
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }
  };

  return (
    <>
      <Flex direction="column" p={3} gap="20px">
        <Input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button onClick={handleSubmit} colorScheme="blue">
          Sign Up
        </Button>
      </Flex>
    </>
  );
};

export default Signup;
