import React from "react";

import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal as ModalUI,
} from "@chakra-ui/react";

interface IModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<IModal>> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <ModalUI isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform="uppercase">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="5">{children}</ModalBody>
      </ModalContent>
    </ModalUI>
  );
};
