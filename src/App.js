import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './modules/Index/Index';
import Dashboard from './modules/dash/Dashboard';
import Auth from './modules/auth/Auth';
import Signup from './modules/Signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Index/>}/>
          <Route path = "/join" element={<Signup/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path = "/dash" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;