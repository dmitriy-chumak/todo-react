import { useState } from 'react';
import ChangeTaskField from 'components/ChangeTaskField/ChangeTaskField';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const TaskList = ({ changeCheckbox, deleteTask, changeTask, task }) => {
  const [isCheck, setIsCheck] = useState(task.isCheck);
  const [text, setText] = useState(task.text);
  const [stateCommponentEdit, setStateCommponentEdit] = useState(false);
  const [textError, setTextError] = useState("");

  const changeIsCheck = async () => {
    const err = await changeCheckbox(task._id, !isCheck);

    if (err) {
      return;
    }

    setTextError("");
    setIsCheck(!isCheck);
  }

  const removeTask = async () => {
    const err = await deleteTask(task._id);
    
    if (err) {
      return;
    }
  }

  const confirmTask = async (text) => {
    const newText = text.trim();
    
    if (newText === "") {
      setTextError("Invalid value. Please enter text");
      return;
    }
    const err = await changeTask(task._id, newText);

    if (err) {
      return;
    }

    setTextError("");
    setText(newText);
    setStateCommponentEdit(!stateCommponentEdit);
  }

  const changeTaskText = () => {
    setTextError("");
    setStateCommponentEdit(!stateCommponentEdit);
  }

  return (
    <div className="taskList">
    {!stateCommponentEdit 
      ? <div className="itemList">
          <input 
            type="checkbox" 
            checked={isCheck}
            onChange={changeIsCheck}
          />
          <p className={!isCheck ? "itemList__text" : "itemList__text edited"}>{text}</p>
          {!isCheck && 
            <button className="itemList__button itemList__button_edit" onClick={changeTaskText}></button>
          }
          <button className="itemList__button itemList__button_delete" onClick={removeTask}></button>
        </div>
      : <ChangeTaskField text={text} confirmTask={confirmTask} changeTaskText={changeTaskText}/>
    }
      {textError && 
        <ErrorField textError={textError} />
      }
    </div>
  );
}

export default TaskList;
