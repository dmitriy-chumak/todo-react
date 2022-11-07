import React, { useState } from "react";
import ErrorField from "components/ErrorField/ErrorField";
import "./style.scss";

const TaskList = (props) => {
  const { changeCheckbox, deleteTask, changeTask, task } = props;
  const [isCheck, setIsCheck] = useState(task.isCheck);
  const [text, setText] = useState(task.text);
  const [changedText, setChangedText] = useState("");
  const [flag, setFlag] = useState(false);
  const [textError, setTextError] = useState('');

  const changeIsCheck = async () => {
    const result = await changeCheckbox(task._id, !isCheck);

    if (result.message || result !== 200) {
      setTextError("Error change stage task");
      return;
    }

    setTextError("");
    setIsCheck(!isCheck);
  }

  const removeTask = async () => {
    const result = await deleteTask(task._id);
    
    if (result.message  || result !== 200) {
      setTextError("Error delete task");
      return;
    }

    setTextError("");
  }

  const confirmTask = async () => {
    const newText = changedText.trim();
    
    if (newText === "") {
      setTextError("Please, enter text");
      return;
    }
    const result = await changeTask(task._id, newText);

    if (result.message  || result !== 200) {
      setTextError("Error change task info");
      return;
    }

    setTextError("");
    setText(newText);
    setFlag(!flag);
  }

  const changeTaskText = () => {
    setChangedText(text);
    setFlag(!flag);
  }

  const propText = {
    className:"itemList__text text"
  }

  if (isCheck) {
    propText.className += " edited";
  }
  
  return (
    <>
    {flag 
      ? <div className="taskList">
          <div className="itemList">
            <input 
              type="text" 
              value={changedText}
              onChange={e => setChangedText(e.target.value)}
            />
            <button className="itemList__button itemList__button_confirm" onClick={confirmTask}></button>
            <button className="itemList__button itemList__button_cancel" onClick={changeTaskText}></button>
          </div>
          <ErrorField textError={textError}/>
        </div>
      : <div className="taskList">
          <div className="itemList">
            <input 
              type="checkbox" 
              checked={isCheck}
              onChange={changeIsCheck}
            />
            <p {...propText}>{text}</p>
            {!isCheck && 
              <button className="itemList__button itemList__button_edit" onClick={changeTaskText}></button>
            }
            <button className="itemList__button itemList__button_delete" onClick={removeTask}></button>
          </div>
          <ErrorField textError={textError}/>
        </div>
    }
    </>
  );
}

export default TaskList;
