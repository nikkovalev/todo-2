import React from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

import { Todo, TodoActions } from "./components";
import { storage } from "./services";
import { ITodo, TFilter } from "./types";

const App: React.FC = () => {
  const [todoText, setTodoText] = React.useState<string>("");
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [filter, setFilter] = React.useState<TFilter>("all");
  const [accordionIndex, setAccordionIndex] = React.useState<number>(-1);
  const [editableTodo, setEditableTodo] = React.useState<number | null>(null);

  // Accordions
  const toggleAccordion = () => setAccordionIndex(~accordionIndex);

  // Inputs
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };
  const handleKeyInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.code || event.key;
    if (key === "Enter") {
      if (editableTodo) {
        const newTodos = todos.map((t) => {
          if (t.id === editableTodo) t.text = todoText;
          return t;
        });
        setTodoText("");
        setTodos(newTodos);
        return;
      }
      const todo: ITodo = {
        id: Date.now(),
        text: todoText,
        isDone: false,
      };
      if (accordionIndex < 0) toggleAccordion();
      setTodoText("");
      setTodos((todos) => [...todos, todo]);
    }
  };

  // Todos
  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) t.isDone = !t.isDone;
      return t;
    });
    setTodos(newTodos);
  };
  const clearCompletedTodos = () => {
    const newTodos = todos.filter((t) => !t.isDone);
    setTodos(newTodos);
  };
  const changeFilter = (filter: TFilter) => setFilter(filter);
  const filterTodos = (todos: ITodo[], filter: TFilter) => {
    if (filter === "all") return todos;
    return todos.filter((t) => {
      return (
        (filter === "active" && !t.isDone) ||
        (filter === "completed" && !!t.isDone)
      );
    });
  };
  const editTodo = (id: number, initialText: string) => {
    setTodoText(initialText);
    setEditableTodo(id);
  };
  const getRemainingTodo = (todos: ITodo[]) => {
    return todos.filter((t) => !t.isDone);
  };

  React.useEffect(() => {
    // Get todos from localStorage
    const todos = storage.GET<ITodo[]>("todos");
    if (todos) setTodos(todos);
    return () => {
      // Save todos to localStorage
      storage.SET("todos", todos);
    };
  }, []);

  return (
    <div>
      <Text as="h1" fontSize="6xl" mb={20} textAlign="center" fontWeight={500}>
        TODOS
      </Text>
      <Accordion
        width={800}
        allowToggle={true}
        bg="white"
        index={accordionIndex}
      >
        <AccordionItem>
          <Flex mb={4}>
            <AccordionButton
              width="auto"
              bg="gray.200"
              borderRadius={10}
              onClick={toggleAccordion}
            >
              <AccordionIcon fontSize={30} />
            </AccordionButton>
            <Input
              flexGrow={1}
              minHeight={50}
              border="none"
              aria-label="todo_input"
              placeholder="What needs to be done?"
              value={todoText}
              onChange={handleChangeText}
              onKeyDown={handleKeyInput}
            />
          </Flex>
          <AccordionPanel p={0}>
            {filterTodos(todos, filter).map((t) => (
              <Todo
                key={t.id}
                todo={t}
                checkTodo={checkTodo}
                editTodo={editTodo}
              />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <TodoActions
        todosCount={getRemainingTodo(todos).length}
        changeFilter={changeFilter}
        clearCompletedTodos={clearCompletedTodos}
      />
    </div>
  );
};

export default App;
