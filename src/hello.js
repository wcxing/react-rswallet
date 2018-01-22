import React, { Component } from 'react'

class TestComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  print = () => {
    console.log(123)
  }
  render() {
    return (
      <div className="text-danger fs-18">
        <div className="flex-box">弹性盒子，审查元素，自动添加浏览器厂商前缀</div>
      </div>)
  }
}
export default TestComponent