import React from "react";
import "./style.scss";

const DeleteButtonAll = ({ deleteAllTasks }) => {
  return (
    <button className="postTask__button_delete" onClick={deleteAllTasks}>Delete all</button>
  );
}

export default DeleteButtonAll;
