import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
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
        <Input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} colorScheme="blue">
          Sign Up
        </Button>
      </Flex>
    </>
  );
};

export default Signup;
