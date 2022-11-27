import React from "react";

import { Box, Button, Input } from "@chakra-ui/react";

import { AuthContext } from "../../providers";
import { storage } from "../../services";
import { instance } from "../../services/instance";
import { IUser } from "../../types";

interface ILogin {
  setModal: React.Dispatch<
    React.SetStateAction<"login" | "registration" | null>
  >;
}

export const Login: React.FC<ILogin> = ({ setModal }) => {
  const { setUser } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const login = async () => {
    const res = await instance.post<{ token: string; user: IUser }>(
      "/user/login",
      {
        email,
        password,
      }
    );
    const { token, user } = res.data;
    storage.SET("token", token);
    storage.SET("user", user);
    setUser(user);
    setEmail("");
    setPassword("");
    setModal(null);
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
        mb={5}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <Button
        colorScheme="linkedin"
        disabled={!email.length || !password.length}
        onClick={login}
      >
        Login
      </Button>
    </Box>
  );
};
