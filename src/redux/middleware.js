/**
 * 想要把从接口获取到的数据 当作 action 的 payload 数据，必须使用中间件
 */
/**
 * 这个是 redux-thunk 的源码
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
 */
import utils from '../utils'
export default () => next => action => {
  let { callApi } = action
  console.log('inmiddleware-action', action)
  console.log('inmiddleware-next', next)
  if (!callApi || typeof callApi === 'function') {
    return next(action)
  }
  return utils.callApi(callApi).then(res => {
    next(res)
    console.log('in middleware-res', res, 'next name', next)
    return res
  }, err => {
    console.log('错误了。。。', err)
  }).catch(err => {
    console.log(err)
  })
}