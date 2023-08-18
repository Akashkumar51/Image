import React from 'react';
import './App.css';
import Post from './Post'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allpost from './Allpost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Post/>}/>
        <Route path='/allpost' element={<Allpost/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
