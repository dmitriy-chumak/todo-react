import { useState } from 'react';
import './style.scss'

const FormChangeTask = ({ text, confirmTask, changeStateComponentEdit }) => {
  const [changedText, setChangedText] = useState(text);

  return (
    <div className="changeTask">
      <input 
        type="text" 
        value={changedText}
        onChange={e => setChangedText(e.target.value)}
      />
      <button 
        type="button"
        className="changeTask__button changeTask__button_confirm" 
        onClick={() => confirmTask(changedText)}
      >
      </button>
      <button 
        type="button"
        className="changeTask__button changeTask__button_cancel" 
        onClick={changeStateComponentEdit}
      >
      </button>
    </div>
  );
}

export default FormChangeTask;
