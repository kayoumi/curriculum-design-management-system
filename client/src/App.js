import React, { Component } from 'react'

import { adminRouter } from './routes/index'
import { Route, Switch, Redirect } from 'react-router-dom'

import Layout from './components/layout'

export default class App extends Component {
  render(){
    return (
      <Layout>
        <Switch>
          {
            adminRouter.map(route => {
              return (
                <Route
                  key={route.pathname} 
                  path={route.pathname} 
                  exact={route.exact}
                  render={(routeProps) => {
                    return <route.component {...routeProps} />
                  }} 
                />
              )
            })
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
          <Redirect to='/404' />
        </Switch>
      </Layout>
    );
  }
}