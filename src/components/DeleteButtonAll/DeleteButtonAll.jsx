import './style.scss';

const DeleteButtonAll = ({ deleteAllTask }) => {
  return (
    <button className="button_delete" onClick={deleteAllTask}>Delete all</button>
  );
}

export default DeleteButtonAll;
