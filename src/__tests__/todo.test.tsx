import React from "react";

import App from "../App";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function start() {
  render(<App />);
  expect(screen.getByText("TODOS")).toBeInTheDocument();
}

test("inits and starts app", async () => {
  start();
});

test("(ADD-EDIT-REMOVE) todo", async () => {
  start();
  // ADD new todo
  const inputEl = screen.getByLabelText("todo_input");
  const TODO = "TODO - 1";
  userEvent.type(inputEl, TODO);
  userEvent.keyboard("{Enter}");
  expect(inputEl).toHaveValue("");
  expect(screen.getByText(TODO)).toBeInTheDocument();
  // EDIT todo
  fireEvent.click(screen.getByLabelText("edit_todo"));
  expect(inputEl).toHaveValue(TODO);
  const NEW_TODO = "NEW TODO";
  userEvent.clear(inputEl);
  userEvent.type(inputEl, NEW_TODO);
  expect(inputEl).toHaveValue(NEW_TODO);
  userEvent.keyboard("{Enter}");
  expect(screen.getByText(NEW_TODO)).toBeInTheDocument();
  // CHECK todo
  fireEvent.click(screen.getByLabelText("check_todo"));
  expect(screen.getByText(NEW_TODO)).toHaveStyle({
    "text-decoration": "line-through",
  });
  // CLEAR completed todo
  fireEvent.click(screen.getByLabelText("clear_completed_btn"));
  expect(screen.queryByText(NEW_TODO)).not.toBeInTheDocument();
});
