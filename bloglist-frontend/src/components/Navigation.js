import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Navigation = () => {

  return (
    <Nav variant="tabs" defaultActiveKey="blogs">
      <Nav.Item><Nav.Link eventKey="blogs"><Link to="/">blogs</Link></Nav.Link></Nav.Item>

      <Nav.Item><Nav.Link eventKey="users"><Link to="/users">users</Link></Nav.Link></Nav.Item>

    </Nav>
  )
}

export default Navigation