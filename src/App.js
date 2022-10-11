import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.page';
import Register from './pages/register.page';
import Edit from './pages/edit.page';
import Dashboard from './pages/dashboard.page';

import './App.css';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

function App() {
  const [token, setToken] = useState(getToken());

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Login setToken={setToken}/>}></Route>
          <Route path='/login' element={<Login setToken={setToken}/>}></Route>
          <Route path='/register' element={<Register setToken={setToken}/>}></Route>
          <Route path='*' element={<Login setToken={setToken}/>}/>
        </Routes>
      </Router>
    )
  }

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/edit' element={<Edit/>}></Route>
          <Route path='*' element={<Dashboard/>}/>
        </Routes>
      </Router>
  );
}

export default App;
