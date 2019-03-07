import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const Navigation = () => {

  return (
    <div>
      <Link to="/">blogs</Link>&nbsp;
      <Link to="/users">users</Link>
    </div>
  )
}

export default Navigation