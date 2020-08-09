import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './List';
import AddItem from './AddItem';
import Home from './Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list" component={List}></Route>
        <Route path="/add" component={AddItem}></Route>
      </Switch>
      <Home />
    </Router>
  );
}

export default App;
