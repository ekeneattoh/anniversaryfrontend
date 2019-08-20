import React from 'react';
import logo from './assets/nchetaLogo.png';
import './App.css';
import LandingPage from './components/LandingPage.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LandingPage />
      </header>
      
    </div>
  );
}

export default App;
