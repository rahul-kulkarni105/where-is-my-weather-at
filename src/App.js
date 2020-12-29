import React from 'react';
import { Landing } from './components/Landing'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Weather App
      </header>
      <section className="container">
        <Landing></Landing>
      </section>
    </div>
  );
}

export default App;
