import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Index = React.lazy(() => import('./modules/Index/Index'));
const Dashboard = React.lazy(() => import('./modules/dash/Dashboard'));
const Auth = React.lazy(() => import('./modules/auth/Auth'));
const Signup = React.lazy(() => import('./modules/Signup/Signup'));
const Search = React.lazy(() => import('./modules/Search/Search'));
const Details = React.lazy(() => import('./modules/Details/Details'));

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
