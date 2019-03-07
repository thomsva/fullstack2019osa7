import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  const notification = props.notification

  var style
  if (notification.text === null) {
    style = {
      display: 'none'
    }
  }
  return (< Alert style={style} variant="dark">{notification.text}</Alert>)
}

const mapStateToProps = (state) => {
  return ({ notification: state.notification })
}

export default connect(mapStateToProps, null)(Notification)