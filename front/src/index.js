import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'redux-zero/react';
import store from './store';

import Login from './components/Login';
import Home from './components/Home';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="mainContainer">
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
