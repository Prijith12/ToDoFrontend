import React from 'react'
import Home from './pages/Home'
import {Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Signups from './pages/Signups';

function App() {
  return (
   
      <Routes>
        <Route  path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signUp' element={<Signups/>}></Route>
      </Routes>
   
   
     )
}

export default App
