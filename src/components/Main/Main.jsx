import { useState, useEffect } from 'react';
import DeleteButtonAll from 'components/DeleteButtonAll/DeleteButtonAll';
import PostTask from 'components/PostTask/PostTask';
import TaskList from 'components/TaskList/TaskList';
import ErrorField from 'components/ErrorField/ErrorField';
import { 
  getAllTasks, 
  addTask, 
  deleteOneTask, 
  deleteAllTasks, 
  changeCheckboxTask, 
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

  const changeCheckbox = async (id, check) => {
    try {
      const result = await changeCheckboxTask(id, check);

      if (!result.data._id === id) {
        setTextError("Error change stage. Reload page");
        return true;
      }
  
      let changeTask = allTasks.find(element => element._id === result.data._id);
      changeTask.isCheck = result.data.isCheck;
      setAllTasks(sortTask(allTasks));
    } catch (error) {
      setTextError("Error change stage task")
      return true;
    }
  };

  const changeTask = async (id, text) => {
    try {
      const result = await changeText(id, text);

      if (result.data._id !== id) {
        setTextError("Error change text. Reload page");
        return true;
      }
  
      const changedTask = allTasks.find(element => { return element._id === result.data._id });
      changedTask.text = result.data.text;

    } catch (error) {
      setTextError("Error change task text")
      return true;
    }
  }

  return (
    <div className="main">
      <div className="main__header">      
        <DeleteButtonAll deleteAllTask={deleteAllTask} />
        <PostTask createTask={createTask} />
      </div>
      {textError &&
        <ErrorField textError={textError} />
      }
      {
        allTasks.map(element => {
          return (
            <TaskList 
              task={element} 
              changeCheckbox={changeCheckbox} 
              deleteTask={deleteTask} 
              changeTask={changeTask}
              key={element._id}
            />
          );
        })
      }
    </div>
  );
}

export default Main;
