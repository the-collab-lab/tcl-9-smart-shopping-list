import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './List';
import AddItem from './AddItem';
import Welcome from './Welcome';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route path="/list" component={List}></Route>
        <Route path="/add" component={AddItem}></Route>
      </Switch>
    </Router>
  );
}

export default App;
