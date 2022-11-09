import { useState } from 'react';
import ChangeTaskField from 'components/ChangeTaskField/ChangeTaskField';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const TaskList = ({ changeCheckbox, deleteTask, changeTask, task }) => {
  const [text, setText] = useState(task.text);
  const [stateComponentEdit, setStateComponentEdit] = useState(false);
  const [textError, setTextError] = useState("");

  const changeIsCheck = async (check) => {
    const err = await changeCheckbox(task._id, check);

    if (!err) {
      setTextError("");
    }
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
      ? <div className="task">
          <input 
            type="checkbox" 
            checked={task.isCheck}
            onChange={(e) => changeIsCheck(e.target.checked)}
          />
          <p className={!task.isCheck ? "task__text" : "task__text edited"}>{text}</p>
          {!task.isCheck && 
            <button 
              type="button" 
              className="task__button task__button_edit" 
              onClick={changeStateComponentEdit}
            >
            </button>
          }
          <button 
            type="button" 
            className="task__button task__button_delete" 
            onClick={() => deleteTask(task._id)}
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
