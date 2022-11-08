import { useState } from 'react';

const ChangeTaskField = ({ text, confirmTask, changeStateComponentEdit }) => {
  const [changedText, setChangedText] = useState(text);

  return (
    <div className="itemList">
      <input 
        type="text" 
        value={changedText}
        onChange={e => setChangedText(e.target.value)}
      />
      <button 
        type="button"
        className="itemList__button itemList__button_confirm" 
        onClick={() => confirmTask(changedText)}
      >
      </button>
      <button 
        type="button"
        className="itemList__button itemList__button_cancel" 
        onClick={changeStateComponentEdit}
      >
      </button>
    </div>
  );
}

export default ChangeTaskField;
