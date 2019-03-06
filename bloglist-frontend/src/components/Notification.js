import React from 'react';
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
  console.log('hep')

  var style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification.text === null) {
    style = {
      display: 'none'
    }
  }
  return (<div style={style}>{notification.text}</div>)
}

const mapStateToProps = (state) => {
  return ({ notification: state.notification })
}

export default connect(mapStateToProps, null)(Notification)