import React from 'react';
import logo from './assets/nchetaLogo.png';
import './App.css';
import CreateAnniversary from './containers/CreateAnniversary.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <CreateAnniversary />
    </div>
  );
}

export default App;
