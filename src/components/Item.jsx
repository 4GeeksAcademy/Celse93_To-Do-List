import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";

export const Item = ({ task, setTasksList, tasksList }) => {
  const [showIcon, setShowIcon] = useState(false);

  function deleteItem() {
    setTasksList(tasksList.filter((item) => item.id != task.id));
  }

  return (
    <p
      onMouseOver={(e) => (e.target = setShowIcon(true))}
      onMouseLeave={(e) => (e.target = setShowIcon(false))}
    >
      {task.name}{" "}
      {showIcon ? (
        <DeleteIcon
          sx={{ ml: "15px" }}
          type="button"
          onClick={(e) => (e.target = deleteItem())}
        />
      ) : (
        ""
      )}
    </p>
  );
};
