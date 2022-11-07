import { useState, useEffect } from "react";
import DeleteButtonAll from "components/DeleteButtonAll/DeleteButtonAll";
import PostTask from "components/PostTask/PostTask";
import TaskList from "components/TaskList/TaskList";
import ErrorField from "components/ErrorField/ErrorField";
import { 
  getAllTask, 
  addTask, 
  deleteOneTask, 
  deleteAllTask, 
  changeCheckboxTask, 
  changeText 
} from "services/task-services";
import sortTask from "helpers/sort";
import "./style.scss";

const MainDiv = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      const result = await getAllTask();
      setAllTasks(result.data);
      setErrorText("");

      return;
    } catch (error) {
      setErrorText("Error get task")
      return;
    }
  };

  const createTask = async (text) => {
    try {
      if (text === '') {
        throw new Error();
      }
      const result = await addTask(text);

      setAllTasks([result.data, ...allTasks]);
      setErrorText("");

      return true;
    } catch (error) {
      setErrorText("Error create task");
      return error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const result = await deleteOneTask(id);

      if (result.data.deletedCount !== 1) {
        throw new Error();
      }

      setAllTasks(allTasks.filter(item => item._id !== id));

      return result.status;
    } catch (error) {
      return error.status;
    }
  };

  const deleteAllTasks = async () => {
    try {
      const result = await deleteAllTask();
      
      if (result.data.deletedCount !== allTasks.length) {
        throw new Error();
      }
  
      setAllTasks([]);
      setErrorText("");
      return;

    } catch (error) {
      return setErrorText("Error delete all task");
    }
  };

  const changeCheckbox = async (id, check) => {
    try {
      const result = await changeCheckboxTask(id, check);

      if (!result.data._id === id) {
        throw new Error();
      }
  
      allTasks.forEach(element => {
        if (element._id === id) {
          element.isCheck = result.data.isCheck;
        }
      });
      
      setAllTasks(sortTask(allTasks));

      return result.status;
    } catch (error) {
      return error.message;
    }
  };

  const changeTask = async (id, text) => {
    try {
      const result = await changeText(id, text);

      if (result.data._id !== id) {
        throw new Error();
      }
  
      allTasks.forEach(element => {
        if (element._id === id) {
          element.text = result.data.text;
        }
      });

      return result.status;
    } catch (error) {
      return { message: "Error change task text" };
    }
  }

  return (
    <div className="mainDiv">
      <div className="mainDiv__header">      
        <DeleteButtonAll deleteAllTasks={ deleteAllTasks }/>
        <PostTask 
          create={createTask} 
          deleteAllTasks={deleteAllTasks}
        />
      </div>
      {
        errorText &&
        <ErrorField textError={errorText}/>
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

export default MainDiv;
