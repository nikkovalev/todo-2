import React from "react";

import { Box, Button, Input } from "@chakra-ui/react";

import { instance } from "../../services/instance";
import { IUser } from "../../types";

export const Registration = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");

  const register = async () => {
    try {
      await instance.post<{ user: IUser }>("/user/registration", {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      setRepeatPassword("");
    } catch (error) {
      console.log("Произошла ошибка");
      console.log(error);
    }
  };

  return (
    <Box>
      <Input
        mb={2}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="e-mail"
      />
      <Input
        mb={2}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <Input
        mb={5}
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="repeat password"
      />
      <Button
        colorScheme="pink"
        disabled={
          !email.length ||
          !password.length ||
          !repeatPassword.length ||
          password !== repeatPassword
        }
        onClick={register}
      >
        Registration
      </Button>
    </Box>
  );
};
