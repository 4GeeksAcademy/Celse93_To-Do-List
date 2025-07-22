import "./App.css";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Item } from "./components/Item";
import DeleteIcon from "@mui/icons-material/Delete";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const getList = () => {
    fetch("https://playground.4geeks.com/todo/users/celse", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setTasks(responseJson.todos);
      })
      .catch((error) => {
        console.log("Oh No! There was a problem: \n", error);
      });
  };

  useEffect(getList, []);

  const addItem = () => {
    const requestBody = {
      label: inputValue,
      is_done: false,
    };

    fetch("https://playground.4geeks.com/todo/todos/celse", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getList);

    setInputValue("");
  };

  const inputRegex = /^[a-zA-Z ]*$/;

  const isInputOk = inputRegex.test(inputValue) && !(inputValue.trim() === "");

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    e.key == "Enter" && isInputOk ? addItem() : "";
  };

  const deleteAllTasks = () => {
    tasks.map((task) => {
      fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE",
      }).then(getList);
    });
  };

  return (
    <>
      <Box>
        <input
          id="input"
          placeholder="Tasks"
          type="text"
          required
          pattern="[A-Za-z]+"
          value={inputValue}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        ></input>
        <Box sx={{ mt: "15px" }}>
          {tasks.length == 0
            ? "No tasks, add a task"
            : tasks.map((task) => (
                <Item
                  key={task.id}
                  task={task}
                  setTasksList={setTasks}
                  tasksList={tasks}
                />
              ))}
        </Box>
        <Button
          sx={{ mt: "20px" }}
          variant="outlined"
          onClick={deleteAllTasks}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};
