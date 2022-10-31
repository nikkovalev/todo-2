import React from "react";

import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";

import cn from "classnames";

import { ITodo } from "../types";
import styles from "./Todos.module.css";

interface IProps {
  todo: ITodo;
  checkTodo: (id: number) => void;
  editTodo: (id: number, initialText: string) => void;
}

export const Todo: React.FC<IProps> = ({ todo, checkTodo, editTodo }) => {
  const onCheck = () => checkTodo(todo.id);
  const onEdit = () => editTodo(todo.id, todo.text);

  return (
    <Flex
      className={cn(styles.todo, {
        [styles.todo_done]: todo.isDone,
      })}
      border="1px solid #e2e8f0"
      borderRadius={10}
      paddingY={2}
      paddingX={4}
      mb={2}
      bg="white"
      alignItems="center"
    >
      <IconButton
        aria-label="check_todo"
        mr="22px"
        icon={<CheckIcon color={todo.isDone ? "purple.500" : "green.500"} />}
        rounded="full"
        onClick={onCheck}
      />
      <Text
        fontSize="2xl"
        as="span"
        color={todo.isDone ? "gray.400" : "none"}
        textDecoration={todo.isDone ? "line-through" : "none"}
      >
        {todo.text}
      </Text>
      <IconButton
        ml="auto"
        aria-label="edit_todo"
        icon={<EditIcon color="blue.500" />}
        rounded="full"
        onClick={onEdit}
      />
    </Flex>
  );
};
