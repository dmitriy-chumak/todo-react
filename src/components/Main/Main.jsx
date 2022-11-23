import { useState, useEffect } from 'react';
import DeleteButtonAll from 'components/DeleteButtonAll/DeleteButtonAll';
import FormAddTask from 'components/FormAddTask/FormAddTask';
import Task from 'components/Task/Task';
import ErrorField from 'components/ErrorField/ErrorField';
import { 
  getAllTasks, 
  addTask, 
  deleteOneTask, 
  deleteAllTasks, 
  changeCheckStatusTask, 
  changeText 
} from "services/task-services";
import sortTask from "helpers/sort";
import "./style.scss";

const Main = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [textError, setTextError] = useState("");

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const result = await getAllTasks();
      setAllTasks(result.data);
      setTextError("");
    } catch (error) {
      setTextError("Error get tasks");
    }
  };

  const createTask = async (text) => {
    try {
      const result = await addTask(text);

      setAllTasks([result.data, ...allTasks]);
      setTextError("");
    } catch (error) {
      setTextError("Error create tasks");
      return true;
    }
  };

  const deleteTask = async (id) => {
    try {
      const result = await deleteOneTask(id);

      if (result.data.deletedCount !== 1) {
        setTextError("Error delete, please reload page.");
        return;
      }

      const filtredTasks = allTasks.filter(item => item._id !== id)
      setAllTasks(filtredTasks);
    } catch (error) {
      setTextError("Error delete task");
    }
  };

  const deleteAllTask = async () => {
    try {
      const result = await deleteAllTasks();
      
      if (result.data.deletedCount !== allTasks.length) {
        setTextError("Error delete all tasks. Reload page");
        return;
      }
  
      setAllTasks([]);
      setTextError("");
    } catch (error) {
      setTextError("Error delete all task on server");
    }
  };

  const changeCheckStatus = async (id, check) => {
    try {
      const result = await changeCheckStatusTask(id, check);

      const changeTask = allTasks.find(element => element._id === result.data._id);

      if (changeTask) {
        changeTask.isCheck = result.data.isCheck;
        setAllTasks(sortTask(allTasks));
      }

    } catch (error) {
      setTextError("Error change stage task")
      return error.message;
    }
  };

  const changeTask = async (id, text) => {
    try {
      const result = await changeText(id, text);

      const changedTask = allTasks.find(element => element._id === result.data._id);

      if (changedTask) {
        changedTask.text = result.data.text;
      }
    } catch (error) {
      setTextError("Error change task text")
      return error.message;
    }
  }

  return (
    <div className="main">
      <div className="main__header">      
        <DeleteButtonAll deleteAllTask={deleteAllTask} />
        <FormAddTask createTask={createTask} />
      </div>
      {textError &&
        <ErrorField textError={textError} />
      }
      {
        allTasks.map(task => 
          <Task 
            task={task} 
            changeCheckStatus={changeCheckStatus} 
            deleteTask={deleteTask} 
            changeTask={changeTask}
            key={task._id}
          />
        )
      }
    </div>
  );
}

export default Main;
