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
  useColorModeValue,
} from "@chakra-ui/react";

import { Header, Todo, TodoActions } from "./components";
import { AuthProvider } from "./providers";
import { instance } from "./services/instance";
import { ITodo, TFilter } from "./types";

const App: React.FC = () => {
  const [todoText, setTodoText] = React.useState<string>("");
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [accordionIndex, setAccordionIndex] = React.useState<number>(0);
  const [editableTodo, setEditableTodo] = React.useState<number | null>(null);

  // Requests
  async function fetchData(filter: TFilter = "all") {
    // Get todos
    const res = await instance.get<{ tasks: ITodo[]; count: number }>(
      `/tasks?filter=${filter}`
    );
    setTodos(res.data.tasks);
  }

  // Accordions
  const toggleAccordion = () => setAccordionIndex(~accordionIndex);

  // Inputs
  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };
  const handleKeyInput = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = event.code || event.key;
    if (key === "Enter") {
      if (editableTodo) {
        await instance.put(`/tasks/${editableTodo}`, {
          text: todoText,
        });
        setTodoText("");
        return fetchData();
      }
      const todo = {
        text: todoText,
        isDone: false,
      } as ITodo;
      if (accordionIndex < 0) toggleAccordion();
      await instance.post("/tasks", todo);
      setTodoText("");
      fetchData();
    }
  };

  // Todos
  const checkTodo = async (id: number) => {
    const task = todos.find((t) => t._id === id);
    await instance.put(`/tasks/${id}`, {
      isDone: !task?.isDone,
    });
    fetchData();
  };
  const clearCompletedTodos = async () => {
    await instance.delete("/tasks");
    fetchData();
  };
  const changeFilter = (filter: TFilter) => fetchData(filter);
  const editTodo = (id: number, initialText: string) => {
    setTodoText(initialText);
    setEditableTodo(id);
  };
  const getRemainingTodo = (todos: ITodo[]) => {
    return todos.filter((t) => !t.isDone);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  // styles

  return (
    <AuthProvider>
      <Header />
      <Text as="h1" fontSize="6xl" mb={20} textAlign="center" fontWeight={500}>
        TODOS
      </Text>
      <Accordion width={800} allowToggle={true} index={accordionIndex}>
        <AccordionItem>
          <Flex mb={4}>
            <AccordionButton
              width="auto"
              bg="gray.200"
              borderRadius={10}
              onClick={toggleAccordion}
            >
              <AccordionIcon color="black" fontSize={30} />
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
            {todos.map((t) => (
              <Todo
                key={t._id}
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
    </AuthProvider>
  );
};

export default App;
