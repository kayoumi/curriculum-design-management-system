import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { mainRouter } from './routes/index'
// import zhCN from 'antd/es/locale/zh_CN';
// import { ConfigProvider } from 'antd';

ReactDOM.render(
  // <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        <Route path="/admin" render={(routerProps) => {
          // 权限，需要登陆才能访问 /admin
          return <App {...routerProps} />
        }} />
        {
          mainRouter.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component}/>
          })
        }
        <Redirect to='/admin' from='/' exact  />
        <Redirect to='/404' />
      </Switch>
    </Router>,
  // </ConfigProvider>,
  document.getElementById('root')
);