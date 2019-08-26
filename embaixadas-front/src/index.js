import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './index.css';
import Signin from './views/Signin';
import Register from './views/Register';
import Embassies from './views/Embassies';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route path="/signin" component={Signin} />
        <Route path="/register" component={Register} />
        <Route path="/embassies" component={Embassies} />
      </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root')
);

serviceWorker.unregister();
