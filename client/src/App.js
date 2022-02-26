import React, {Fragment} from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/homepage';
import Login from './pages/login';
import Register from './pages/register';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Fragment>
  );
}

export default App;
