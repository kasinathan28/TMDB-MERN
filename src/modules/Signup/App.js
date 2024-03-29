import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '../Index/Index';
import Dashboard from '../dash/Dashboard';
import Auth from '../auth/Auth';
import Signup from './Signup';
import Search from '../Search/Search';
import Details from '../Details/Details';

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
          <Route path='/details/:mediaType/:id' element={<Details/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;