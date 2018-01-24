/**
 * 引入 fetch 模拟网络请求 测试异步action
*/
// import fetch from 'isomorphic-fetch'
import 'babel-polyfill'

// 导入常量
import { ADD_TODO,
  FETCH_NEW_TIME,
  FETCHGETTEST
} from './const'

// action 创建函数
export function addToDo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
export const getCurrentTime = () => {
  console.log('action')
  return {
    type: FETCH_NEW_TIME,
    payload: {
      curruntTime: new Date().toString()
    }
  }
}
/**
 * 异步action
 * 异步 action
 */

/* export const handelGetData = (obj) => {
  console.log(99)
  // 请求数据 请求参数由action中保存
  // fetch('/api/2').then((res) => {
  //   console.log(111, res)
  // })
  return {
    type: FETCHGETTEST,
    payload: {
      aaa: res
    }
  }
} */
export const handelGetData = (param) => ({
  callApi: {
    type: FETCHGETTEST,
    path: '/mock/mock1/test.json',
    method: 'GET',
    param
  }
})