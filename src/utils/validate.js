// 随机数生成函数
export const rn = (min, max) => Math.floor(Math.random() * (max - min) + min)
// 随机颜色生成函数
export const rc = (min, max) => {
  let r = rn(min, max)
  let g = rn(min, max)
  let b = rn(min, max)
  return `rgb(${r}, ${g}, ${b})`
}

export class Validate {
  constructor(w = 120, h = 50, strNum = 4, lineNum = 8, circleNum = 100) {
    this.w = w
    this.h = h
    this.strNum = strNum
    this.lineNum = lineNum
    this.circleNum = circleNum
    this.str = ''
    this.ctx = null
    this.canvas = null
  }
  init() {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.ctx = this.canvas.getContext('2d')
    this.drawFn()
    this.canvas.onclick = () => {
      this.ctx.clearRect(0, 0, this.w, this.h)
      this.drawFn()
    }
    return this.canvas
  }
  drawFn() {
    this.ctx.fillStyle = rc(180, 230)
    this.ctx.fillRect(0, 0, this.w, this.h) // 绘制背景颜色
    this.randomStr()
    this.line()
    this.circle()
  }
  reset() {
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.str = this.drawFn()
  }
  line() {
    // 随机生成干扰线
    for (let i = 0; i < this.lineNum; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(rn(0, this.w), rn(0, this.h))
      this.ctx.lineTo(rn(0, this.w), rn(0, this.h))
      this.ctx.strokeStyle = rc(180, 230)
      this.ctx.closePath()
      this.ctx.stroke()
    }
    return this.ctx
  }
  circle() {
    // 随机生成小圆点
    for (let i = 0; i < this.circleNum; i++) {
      this.ctx.beginPath()
      this.ctx.arc(rn(0, this.w), rn(0, this.h), 1, 0, 2 * Math.PI)
      this.ctx.closePath()
      this.ctx.fillStyle = rc(150, 200)
      this.ctx.fill()
    }
    return this.ctx
  }
  randomStr() {
    // 随机字符串
    let str = ''
    let pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < this.strNum; i++) {
      let c = pool[rn(0, pool.length)] // 随机字符串
      str += c
      let fs = rn(18, Math.ceil(this.w / this.strNum) - 5) // 字体大小
      let deg = rn(-45, 45) // 旋转角度
      this.ctx.font = fs + 'px Arial'
      this.ctx.textBaseline = 'top'
      // 设置字体颜色
      this.ctx.fillStyle = rc(80, 150)
      this.ctx.save()
      this.ctx.translate(25 * i + 10, 15)
      this.ctx.rotate(deg * Math.PI / 180)
      this.ctx.fillText(c, 5, 0)
      this.ctx.restore()
    }
    this.str = str
  }
  getStr() {
    return this.str
  }
}
