import React from "react";

import { Button, Flex, Text } from "@chakra-ui/react";

import { TFilter } from "../types";

interface IProps {
  todosCount: number;
  changeFilter: (filter: TFilter) => void;
  clearCompletedTodos: () => void;
}

export const TodoActions: React.FC<IProps> = ({
  todosCount,
  changeFilter,
  clearCompletedTodos,
}) => {
  const onClick = (filter: TFilter) => () => changeFilter(filter);

  return (
    <Flex alignItems="center" justifyContent="space-between" mt={5}>
      <Text fontSize="xl" as="span" color="gray.500">
        {todosCount} items left
      </Text>
      <Flex alignItems="center">
        <Button mr={4} variant="yellow" onClick={onClick("all")}>
          All
        </Button>
        <Button mr={4} variant="green" onClick={onClick("active")}>
          Active
        </Button>
        <Button variant="blue" onClick={onClick("completed")}>
          Completed
        </Button>
      </Flex>
      <Button
        aria-label="clear_completed_btn"
        variant="red"
        onClick={clearCompletedTodos}
      >
        Clear completed
      </Button>
    </Flex>
  );
};
