import React, { Component } from 'react';

import "./styles.css";
import Header from './components/Header';
import Main from "./pages/main";
import Counter from "./pages/counter";

class App extends Component {
  render() {
    return <div className="App">
            <Header />
            <Main />
            <Counter />
           </div>
  };
}

export default App;
