import React from 'react';
import logo from './logo.svg';
import './App.css';

import Adder from "./components/Adder.js"


function App() {
  return (
    <div id="container">
      <header>
      <h1>Stock Portfolio</h1>
      </header>
      
      <Adder />
    </div>
  );
}

export default App;
