import React, { useState } from "react";
import "./style.scss";

const PostTask = (props) => {
  const { create } = props
  const [textInput, setTextInput] = useState("");

  const addNewTask = (e) => {
    e.preventDefault();
    const changeText = textInput.trim();

    const newTask = {
      text: changeText,
    };
    const result = create(newTask);

    if (!result) {
      return
    }

    setTextInput("");
  }
  return (
    <div className="postTask">
      <h1 className="postTask__header">To-Do List</h1>
      <div className="postTask__inputField">
        <input 
          type="text" 
          className="postTask__input" 
          id="input-task"
          value={textInput} 
          placeholder="Enter task"
          onChange={e => setTextInput(e.target.value)}
          />
        <button className="postTask__button" onClick={addNewTask}>Add</button>
      </div>
    </div>
  );
}

export default PostTask;
