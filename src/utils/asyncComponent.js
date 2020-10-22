import React, { Component } from 'react'

const asyncComponent = (importComponent) => class extends Component {
    state = {
      component: null
    }

    componentDidMount() {
      importComponent().then(mod => {
        this.setState({
          component: mod.default ? mod.default : mod
        })
      })
    }

    render() {
      const C = this.state.component
      return C ? <C { ...this.props } /> : null
    }
}

export default asyncComponent
