import { useState } from 'react';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const FormAddTask = ({ createTask }) => {
  const [textInput, setTextInput] = useState("");
  const [textError, setTextError] = useState("");

  const addNewTask = async () => {
    const newText = textInput.trim();

    if (newText === "") {
      setTextError("Invalid value. Please enter text");
      return;
    }

    const newTask = {
      text: newText,
    };
    const err = await createTask(newTask);
    
    if (!err) {
      setTextError("");
      setTextInput("");
    }
  }
  
  return (
    <div className="postTask">
      <h1 className="postTask__header">To-Do List</h1>
      {textError && <ErrorField textError={textError} />}
      <div className="postTask__inputAndButton">
        <input 
          type="text" 
          className="postTask__inputAndButton_input" 
          id="input-task"
          value={textInput} 
          placeholder="Enter task"
          onChange={e => setTextInput(e.target.value)}
        />
        <button 
          type="button" 
          className="postTask__inputAndButton_button" 
          onClick={addNewTask}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default FormAddTask;
