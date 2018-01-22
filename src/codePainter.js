import React, { Component } from 'react'
import svgpath from 'svgpath'
import qr from 'qr-image'
// 在引入图片时有两种引入方式 import 和 require
import img1 from './style/images/timg.jpg'
// const img1 = require('./style/images/timg.jpg')
class CodePainter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      svgPath: null // 保存二维码SVG的path
    }
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="请输入"
          onChange={(e) => {
            const originPath = qr.svgObject(e.target.value).path //  获得二维码的绘制路径
            const scaledPath = svgpath(originPath).scale(10, 10).toString()
            this.setState({ svgPath: scaledPath })
          }}
        />
        <br />
        <h3>（url-loader）带图标的按钮，引入图标字体</h3>
        <button type="button" className="btn btn-default">
          按钮
          <span className="glyphicon glyphicon-align-left" />
        </button>
        <h3>（url-loader）测试图片打包，在开发时img可以使用src链接入相对路径；在生产环境要先把需要展示的静态图片require进来并赋值给一个变量，该变量就是img的src的值，通过｛｝引入。</h3>
        <img src={img1} width="200" height="200" alt="" />
        <div style={{ marginTop: '20px' }}>margin</div>
        <label>生成的二维码</label><br />
        <svg width="100%" height="300">
          <path d={this.state.svgPath ? this.state.svgPath : null} />
        </svg>
      </div>
    )
  }
}
export default CodePainter
