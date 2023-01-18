import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import History from './pages/history';
import Login from './pages/login';
import TeamInfo from './pages/teamInfo';
import { UserContext, User } from './contexts/userContext';

export default function App() {
  const [user, setUser] = useState(User.user, User.setUser);

  return (
    <Router className='App'>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/history'>History</Link>
        </li>
        <li>
          <Link to='/teaminfo'>Team Info</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/history' element={<History />}></Route>
          <Route path='/teamInfo' element={<TeamInfo />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
