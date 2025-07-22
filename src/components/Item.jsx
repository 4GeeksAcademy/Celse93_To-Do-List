import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

export const Item = ({ task, setTasksList }) => {
  const [showIcon, setShowIcon] = useState(false);

  const getList = () => {
    fetch("https://playground.4geeks.com/todo/users/celse", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        setTasksList(responseJson.todos);
      })
      .catch((error) => {
        console.log("Oh No! There was a problem: \n", error);
      });
  };

  const deleteItem = () => {
    fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
      method: "DELETE",
    }).then(getList);
  };

  const handleOnClick = (e) => {
    e.target = deleteItem();
  };

  const handleOnMouseOver = (e) => {
    e.target = setShowIcon(true);
  };

  const handleOnMouseLeave = (e) => {
    e.target = setShowIcon(false);
  };

  return (
    <p onMouseOver={handleOnMouseOver} onMouseLeave={handleOnMouseLeave}>
      {task.label}{" "}
      {showIcon ? (
        <DeleteIcon sx={{ ml: "15px" }} type="button" onClick={handleOnClick} />
      ) : (
        ""
      )}
    </p>
  );
};
