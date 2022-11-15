import { useState } from 'react';
import FormChangeTask from 'components/FormChangeTask/FormChangeTask';
import ErrorField from 'components/ErrorField/ErrorField';
import './style.scss';

const Task = ({ changeCheckbox, deleteTask, changeTask, task }) => {
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
      setStateComponentEdit(!stateComponentEdit);
    }
  }

  const changeStateComponentEdit = () => {
    setTextError("");
    setStateComponentEdit(!stateComponentEdit);
  }

  return (
    <div className="tasks">
    {!stateComponentEdit 
      ? <div className="task">
          <input 
            type="checkbox" 
            checked={task.isCheck}
            onChange={(e) => changeIsCheck(e.target.checked)}
          />
          <p className={!task.isCheck ? "task__text" : "task__text edited"}>{task.text}</p>
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
      : <FormChangeTask 
          text={task.text} 
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

export default Task;
