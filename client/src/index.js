import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom'
import './index.css';
import App from './App'
import store from './store'
import { mainRoutes } from './routes'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/back' component={App}/>
        {
          mainRoutes.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
          })
        }
        <Redirect to='/back' from='/' exact  />
        <Redirect to='/404' exact/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);