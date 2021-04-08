import React, { Component } from 'react'
import { Validate } from '@/utils/validate'

class SelfValidate extends Component {
  constructor(props) {
    super(props)
    const validatesCanvas = new Validate(props.width, props.height)
    validatesCanvas.init()
    this.state = {
      validates: validatesCanvas
    }
    this.props.change(validatesCanvas.str)
    this.handleClickCanvas = this.handleClickCanvas.bind(this)
  }
  componentDidMount() {
    const cavBox = document.querySelector('.canvas-validate')
    cavBox.appendChild(this.state.validates.canvas)
  }
  handleClickCanvas() {
    this.props.change(this.state.validates.str)
  }
  render() {
    return (
      <div className="canvas-validate" onClick={ this.handleClickCanvas }></div>
    )
  }
}

export default SelfValidate
