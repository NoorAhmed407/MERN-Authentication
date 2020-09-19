import React from 'react';
import Login from './component/login';
import SignUp from './component/signup';
import Profile from './component/profile';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
