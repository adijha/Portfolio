import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start" }}>

        <img src={logo} alt="logo" style={{ width: '60px', marginTop: "20px", marginLeft: '30px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <div>
          <h1>Designer, Front-end Developer & Mobile also</h1>
        </div>
      </div>

    </div>
  );
}

export default App;
