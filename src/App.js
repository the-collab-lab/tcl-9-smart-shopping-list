import React from 'react';
import './App.css';
import ItemsProvider from './ItemsContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import List from './List';
import AddItem from './AddItem';
import Welcome from './Welcome';

function App() {
  return (
    <ItemsProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <PrivateRoute path="/list">
            <List />
          </PrivateRoute>
          <PrivateRoute path="/add">
            <AddItem />
          </PrivateRoute>
        </Switch>
      </Router>
    </ItemsProvider>
  );
}
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') ? (
          children
        ) : (
          <Redirect
            exact
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default App;
