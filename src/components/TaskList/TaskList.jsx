import { useState } from 'react';
import ChangeTaskField from 'components/ChangeTaskField/ChangeTaskField';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const TaskList = ({ changeCheckbox, deleteTask, changeTask, task }) => {
  const [isCheck, setIsCheck] = useState(task.isCheck);
  const [text, setText] = useState(task.text);
  const [stateComponentEdit, setStateComponentEdit] = useState(false);
  const [textError, setTextError] = useState("");

  const changeIsCheck = async () => {
    const err = await changeCheckbox(task._id, !isCheck);

    if (!err) {
      setTextError("");
      setIsCheck(!isCheck);
    }
  }

  const removeTask = async () => {
    await deleteTask(task._id);
  }

  const confirmTask = async (text) => {
    const newText = text.trim();
    
    if (newText === "") {
      setTextError("Invalid value. Please enter text");
      return;
    }
    const err = await changeTask(task._id, newText);

    if (!err) {
      setTextError("");
      setText(newText);
      setStateComponentEdit(!stateComponentEdit);
    }
  }

  const changeStateComponentEdit = () => {
    setTextError("");
    setStateComponentEdit(!stateComponentEdit);
  }

  return (
    <div className="taskList">
    {!stateComponentEdit 
      ? <div className="itemList">
          <input 
            type="checkbox" 
            checked={isCheck}
            onChange={changeIsCheck}
          />
          <p className={!isCheck ? "itemList__text" : "itemList__text edited"}>{text}</p>
          {!isCheck && 
            <button 
              type="button" 
              className="itemList__button itemList__button_edit" 
              onClick={changeStateComponentEdit}
            >
            </button>
          }
          <button 
            type="button" 
            className="itemList__button itemList__button_delete" 
            onClick={removeTask}
          >
          </button>
        </div>
      : <ChangeTaskField 
          text={text} 
          confirmTask={confirmTask} 
          changeStateComponentEdit={changeStateComponentEdit}
        />
    }
      {textError && 
        <ErrorField textError={textError} />
      }
    </div>
  );
}

export default TaskList;
