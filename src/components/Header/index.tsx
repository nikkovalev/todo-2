import React from "react";

import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";

import { AuthContext } from "../../providers";
import { Modal } from "../Modal";
import { Login } from "../Modal/Login";
import { Registration } from "../Modal/Registration";

export const Header = () => {
  const [modal, setModal] = React.useState<"login" | "registration" | null>(
    null
  );
  const { user, logout } = React.useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const onOpenModal = (modalName: "login" | "registration") => () => {
    setModal(modalName);
  };
  const onCloseModal = () => setModal(null);

  return (
    <>
      <Modal title={modal as string} isOpen={!!modal} onClose={onCloseModal}>
        {modal === "login" && <Login setModal={setModal} />}
        {modal === "registration" && <Registration />}
      </Modal>
      <Flex alignItems="center" justifyContent="space-between">
        <Button colorScheme="yellow" onClick={toggleColorMode}>
          Color mode - {colorMode}
        </Button>
        {!user && (
          <Flex>
            <Button variant="blue_o" mr="5" onClick={onOpenModal("login")}>
              Login
            </Button>
            <Button variant="green_o" onClick={onOpenModal("registration")}>
              Registration
            </Button>
          </Flex>
        )}
        {user && (
          <Flex alignItems="center">
            <Text color="green.500" mr="5">
              {user.email}
            </Text>
            <Button variant="red_o" onClick={logout}>
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};
