import React, { Component } from 'react'

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    console.log('error:', error)
    console.log('errorInfo:', errorInfo)
  }
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>
  }
}

export default ErrorBoundary
