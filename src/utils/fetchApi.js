/**
 * name: fetchApi.js
 * author: wucx
 * date: 2018-01-18
 */
import fetch from 'isomorphic-fetch'
/**
 * 请求接口 url
 */
// let configUrl = 'http://localhost:3006'  // koa mock 接口
let configUrl = 'https://www.easy-mock.com/mock/5a152af8f64292527e65ff38/example' // ease-mock 接口
/**
 * 设置默认配置（请求头）
 */
const DEFAULT_OPTION = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  credentials: 'include',
  /**
   * 踩坑：在浏览器的network中可以看到返回数据，但是在控制台打印时总是看不到数据
   * 发起的是跨域请求，给fetch的参数设置为mode:"cors"，然后node那里加一句app.use(require('cors')());
   * 如果fetch设置为mode:"no-cors"，可以请求成功，但是response的属性不可读
   */
  mode: 'cors', // 涉及跨域问题 cros表示可以跨域 no-cors表示不可跨域。 当设置了
  body: {}
}

/**
 * 获取默认的 header 配置
 * @return { DEFAULT_OPTION.headers | {Accept, Content-Type }}
 */
export const HEADERS = DEFAULT_OPTION.headers
/**
 * 对接口入参处理
 * body 最终要转换成字符串形式才能传送（跟ajax相同）
 */
export function bodyParse(body, dataType = 'json') {
  if (Object.prototype.toString.call(body) !== '[object Object]') {
    return ''
  }
  if (dataType === 'json') {
    return JSON.stringify(body)
  }
  return Object.keys(body).map(key => {
    let value = body[key]
    value = JSON.stringify(value)
    value = encodeURIComponent(value)
    return `${key}=${value}`
  }).join('&')
}

/**
 * fetch 请求
 * @param url 目标url
 * @param option fetch 参数
 * @param [dataType] 获取数据类型 目前只支持json和text
 * @return {promise}
 */
export function fetchApi(url, option = {}, dataType = 'json') {
  let rawOption = option || {}
  const realOption = Object.assign(
    DEFAULT_OPTION,
    option
  )
  let x
  if (realOption.body && realOption.body.body) {
    for (x in realOption.body.body) {
      if (realOption.body.body[x] === '') realOption.body.body[x] = null
    }
  }
  // 如果是 post 请求
  if (realOption.method === 'POST') {
    realOption.body = bodyParse(realOption.body)
  }
  rawOption.headers = Object.assign(
    DEFAULT_OPTION.headers,
    option.headers
  )
  // promise 写法
  /* return new Promise((resolve, reject) => {
    let realUrl = configUrl + url
    fetch(realUrl, option).then(res => {
      console.log(res)
      return res.json()
    }).then(data => {
      console.log('请求返回', data)
      resolve(data)
    }).catch(error => {
      console.log('请求报错', error)
      reject()
    })
  }) */
  // async 写法
  return new Promise(async (reslove, reject) => {
    let realUrl = configUrl + url
    console.log('请求入参', realOption)
    const res = await fetch(realUrl, realOption)
    console.log('777777', res)
    console.log('dataType', Response)
    if (res.ok) {
      if (dataType.toUpperCase() === 'TEXT') {
        const text = await res.text()
        reslove(text)
      } else if (dataType.toUpperCase() === 'JSON') {
        const json = await res.json()
        console.log('json', json)
        reslove(json)
      }
    } else {
      reject(res)
    }
    // try {
    // } catch (err) {
    //   console.log('xxxxxxxx', err, typeof err)
    // }
  })
}
const callApi = (apiConfig) => {
  const { path, param, method, saveAs, query, ...rest } = apiConfig // eslint-disable-line
  /**
   * 处理入参
   * 如果入参无值 或 值为空 等，则删掉入参
   */
  for (let i in param) {
    if (param[i] === '' || param[i] === null || param[i] === undefined) {
      delete param[i]
    }
  }
  console.log('in fetch:', apiConfig)
  return fetchApi(path, {
    body: {
      body: param,
      sign: '',
      token: ''
    },
    method
  }).then((res) => {
    let { type } = apiConfig,
      data = res
    console.log('数据', res)
    return {
      type, data, saveAs, ...rest
    }
  }, (err) => {
    console.log(err)
  })
}
export default callApi