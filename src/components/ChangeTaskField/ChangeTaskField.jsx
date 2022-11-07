import { useState } from 'react';

const ChangeTaskField = ({ text, confirmTask, changeTaskText }) => {
  const [changedText, setChangedText] = useState(text);

  return (
    <div className="itemList">
      <input 
        type="text" 
        value={changedText}
        onChange={e => setChangedText(e.target.value)}
      />
      <button className="itemList__button itemList__button_confirm" onClick={() => confirmTask(changedText)}></button>
      <button className="itemList__button itemList__button_cancel" onClick={changeTaskText}></button>
    </div>
  );
}

export default ChangeTaskField;
