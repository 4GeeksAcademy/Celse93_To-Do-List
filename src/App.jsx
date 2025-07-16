import "./App.css";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Item } from "./components/Item";



export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const addItem = () => {
    setTasks([...tasks, { id: crypto.randomUUID(), name: inputValue }]);
  }


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
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key == "Enter" && e.target.checkValidity()
              ? addItem()
              : "";
          }}
          onInvalid={(e) => {
            inputValue === "" 
              ? alert("Enter a task!")
              : alert("Task can only contain letters!");
          }} 
        ></input>
        <Box sx={{ mt:"15px" }}>
          {tasks.length == 0
            ? "No tasks, add a task"
            : tasks.map((task) => (
                <Item task={task} setTasksList={setTasks} tasksList={tasks} />
              ))}
        </Box>
      </Box>
    </>
  );
};
