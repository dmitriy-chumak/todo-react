import axios from 'axios';
import url from 'constant';

const getAllTask = async () => {
  const result = await axios.get(url);
  return result;
}

const addTask = async (text) => {
  const result = await axios.post(url, text);
  return result;
}

const changeCheckboxTask = async (id, isCheck) => {
  const result = await axios.patch(`${url}/isCheck/${id}`, { isCheck });
  return result;
}

const changeText = async (id, text) => {
  const result = await axios.patch(`${url}/text/${id}`, { text });
  return result;
}

const deleteOneTask = async (id) => {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}

const deleteAllTask = async () => {
  const result = await axios.delete(`${url}`);
  return result;
}

export {
  getAllTask,
  addTask,
  changeCheckboxTask,
  changeText,
  deleteOneTask,
  deleteAllTask,
}