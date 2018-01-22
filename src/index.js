// import _ from 'lodash' // eslint-disable-line
import './app.js'
import './style/sass/test.scss'
import './style/css/test.css'
import './style/css/bootstrap.css'

// console.log(_.join(['TheOther', 'module', 'loaded!'], ' '))
/**
 * 动态加载(按需加载) 两种方式：1、ECMAScript提案的import（） 2、webpack特定的 require.ensure
 */
function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    let element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    return element
  }).catch(error => console.log('An error occurred while loading the component', error))
}

getComponent().then(component => {
  document.body.appendChild(component)
})