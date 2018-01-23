import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import middleware from './middleware'
import rootReducer from './reducer'
/**
 * 不使用 middleware 时的creatstore
 */
// export const configureStore = () => {
//   const store = createStore(rootReducer, initialState)
//   return store
// }
// export default configureStore
/**
 * 使用 redux-thunk 和 fetch 测试异步action
 */
let creatStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore)
const configureStore = () => {
  const store = creatStoreWithMiddleware(rootReducer)
  return store
}
export default configureStore