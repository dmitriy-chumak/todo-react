import { Routes, Route, Navigate } from 'react-router-dom';
import Main from 'components/Main/Main';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
