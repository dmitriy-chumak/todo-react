import './style.scss';

const DeleteButtonAll = ({ deleteAllTask }) => {
  return (
    <button 
      type="button"
      className="button_delete" 
      onClick={deleteAllTask}
    >
      Delete all
    </button>
  );
}

export default DeleteButtonAll;
