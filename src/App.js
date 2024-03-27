import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './modules/Index/Index';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Index/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;