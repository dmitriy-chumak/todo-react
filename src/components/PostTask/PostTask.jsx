import { useState } from 'react';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const PostTask = ({ createTask }) => {
  const [textInput, setTextInput] = useState("");
  const [textError, setTextError] = useState("");

  const addNewTask = () => {
    const newText = textInput.trim();

    if (newText === "") {
      setTextError("Invalid value. Please enter text");
      return;
    }

    const newTask = {
      text: newText,
    };
    createTask(newTask);

    setTextError("");
    setTextInput("");
  }
  return (
    <div className="postTask">
      <h1 className="postTask__header">To-Do List</h1>
      {textError && <ErrorField textError={textError} />}
      <div className="postTask__inputAndButton">
        <input 
          type="text" 
          className="postTask__input" 
          id="input-task"
          value={textInput} 
          placeholder="Enter task"
          onChange={e => setTextInput(e.target.value)}
          />
        <button type="button" className="postTask__button" onClick={addNewTask}>Add</button>
      </div>
    </div>
  );
}

export default PostTask;
