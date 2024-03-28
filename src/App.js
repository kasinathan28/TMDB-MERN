import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './modules/Index/Index';
import Dashboard from './modules/dash/Dashboard';
import Auth from './modules/auth/Auth';
import Signup from './modules/Signup/Signup';
import Search from './modules/Search/Search';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Index/>}/>
          <Route path = "/join" element={<Signup/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path = "/dash" element={<Dashboard/>}/>
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;