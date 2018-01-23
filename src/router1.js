/* eslint-disable */
import React, { Component } from 'react'
/**
 * 引入把redux和视图连接
 * 1、引入 react-redux
 * 2、引入 actionCreactor
 * 3、引入 reducer
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as action from './redux/action'
import './redux/reducer'
class TestOne extends Component {
  constructor(props) {
    super(props)
    console.log('constructor===', props)
    this.state = {
      // init: 1
    }
  }
  static defaultProps={
    currTime: ''  
  }
  componentWillReceiveProps(next) {
    console.log('willReceiveProps', next)
  }
  /**
   * 获取当前时间
   */
  getCurrTime = () => {
    console.log('触发了点击')
    console.log('获取到的全局变量__ENV__.domain', __ENV__)
    this.props.getCurrTime()
  }

  /**
   * 调用接口 从服务端获取数据
   */
  handelGetData = () => {
    this.props.handelGetData({aaa: 123}).then(res => {
      console.log(3333, res)
    })
  }
  render() {
    console.log(2222, this.props)
    return (
      <div>
        <h2>路由一</h2>
        <p>这是路由一的内容！！！</p>
        <button onClick={this.getCurrTime}>点击获取当前</button>
        <h2>当时时间是：</h2>
        <p>{this.props.currTime.curruntTime}</p>
        <button onClick={this.handelGetData}>点击调用接口，从服务端获取数据</button>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  currTime: state.currentTime,
  state
})
const mapDispatchToProps = (dispatch) => ({
  getCurrTime: bindActionCreators(action.getCurrentTime, dispatch),
  handelGetData: bindActionCreators(action.handelGetData, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TestOne)