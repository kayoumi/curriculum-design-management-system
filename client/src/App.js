import React, { Component } from 'react'
import { connect} from 'react-redux'
import { adminRoutes } from './routes/index'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/layout'

const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})

 class App extends Component {
  render(){
    console.log();
    
    return (
      this.props.isLogin
      ?
        <Layout>
          <Switch>
            {
              adminRoutes.map(route => {
                return (
                  <Route 
                    key={route.pathname}
                    path={route.pathname}
                    exact={route.exact}
                    render = {(routeProps) => {

                      const hasPermission = route.roles.includes(this.props.role)

                      return hasPermission ? <route.component {...routeProps}/> : <Redirect to='/admin/noauth' />
                    }}
                  />
                )
              })
            }
          </Switch>
        </Layout>
      : <Redirect to='/login'/>
    );
  }
}

export default connect(mapState)(App)