import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

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
      console.log(result);
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

        <Button colorScheme="blue" onClick={handleSubmit}>
          Login
        </Button>
      </Flex>
    </>
  );
};

export default Login;
