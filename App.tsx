import React, { Component } from 'react';
import './App.css';
import Body from './Body';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Body />
        </header>
      </div>
    );
  }
}

export default App;