import { combineReducers } from 'redux'
import {
  FETCH_NEW_TIME,
  TODOLIST,
  FETCHGETTEST
} from './const'
export const initialState = {
  currentTime: new Date().toString()
}
// 获取当前时间
export const currentTime = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEW_TIME:
      console.log('reducer==', state)
      return action.payload
    default:
      return state
  }
}
const todoList = (state = {}, action) => {
  switch (action.type) {
    case TODOLIST:
      return { state, todoList: 'there are list' }
    default:
      return state
  }
}
// 调用接口获取数据
const handleGetData = (state = {}, action) => {
  switch (action.type) {
    case FETCHGETTEST:
      console.log('reducer', action)
      return action
    default:
      return state
  }
}

const rootReducer = combineReducers({ currentTime, todoList, handleGetData })
export default rootReducer
