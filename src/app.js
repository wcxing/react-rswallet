/* eslint-disable */
import React from 'react'
import { render } from 'react-dom' // 注意 react 和 react-dom 分开了 都需要安装， reactDom.render 是 react-dom的方法（render）
import * as react from 'react'
import * as reactDom from 'react-dom'
import { Provider } from 'react-redux' // 与视图连接
import Hello from './hello.js'
import CodePainter from './codePainter.js'
import Routers from './routers'
import configureStore from './redux/store'
console.log(react)
console.log(reactDom)
const rootElement = document.querySelector('#app')
let store = configureStore()

store.subscribe(() => {
  console.log('[LOG--]', store.getState())
})

render(<div>
    <Provider store={store}>
      <Routers />
    </Provider>
    <Hello />
    <CodePainter />
  </div>, rootElement)
// if (module.hot) {
//   module.hot.accept('./codePainter.js', function(){

//   })
// }