import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the fields",
        duration: 3000,
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged In successfully",
        duration: 3000,
        status: "success",
        isClosable: true,
        position: "bottom",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Error Occured !",
        duration: 3000,
        description: err.message,
        status: "error",
        isClosable: true,
        position: "bottom",
      });
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
        <Input
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </Flex>
    </>
  );
};

export default Login;
