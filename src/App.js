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
import useTokenHook from './useTokenHook';
import TokenProvider from './TokenProvider';

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
function PrivateRoute({ children, ...rest }) {
  const { token } = useTokenHook();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
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
