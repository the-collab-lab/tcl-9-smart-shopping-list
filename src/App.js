import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './List.js';
import Add from './Add.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list" component={List}></Route>
        <Route path="/add" component={Add}></Route>
      </Switch>
    </Router>
  );
}

export default App;
