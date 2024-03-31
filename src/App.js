import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './modules/Index/Index';
import Dashboard from './modules/dash/Dashboard';
import Auth from './modules/auth/Auth';
import Signup from './modules/Signup/Signup';
import Search from './modules/Search/Search';
import Details from './modules/Details/Details';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/join" element={<Signup />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/details/:mediaType/:id" element={<Details />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;