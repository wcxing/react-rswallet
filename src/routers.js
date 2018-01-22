/* eslint-disable */
import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import router1 from './router1'
import router2 from './router2'
// export default class extends C
/**
 * 
 */ 
export default () => (
  <div>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/router_1">跳转到路由1</Link></li>
          <li><Link to="/router_2">跳转到路由2</Link></li>
        </ul>
        <Switch>
          <Route exact path="/router_1" component={router1} />
          <Route exact path="/router_2" component={router2} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
)

