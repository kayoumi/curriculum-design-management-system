import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './index.css';
import App from './App'
import store from './store'
import { mainRoutes } from './routes'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/admin' component={App} />
        {
          mainRoutes.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
          })
        }
        <Redirect to='/admin' from='/' exact  />
        <Redirect to='/404' />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);