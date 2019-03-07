import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {

  return (
    <Nav variant="tabs" defaultActiveKey="blogs">
      <Nav.Item><Nav.Link as="span" eventKey="blogs"><Link to="/">blogs</Link></Nav.Link></Nav.Item>
      <Nav.Item><Nav.Link as="span" eventKey="users"><Link to="/users">users</Link></Nav.Link></Nav.Item>
    </Nav>
  )
}

export default Navigation
