import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="dark" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Card>
          <Card.Body>
            {props.children}


          </Card.Body>
          <Button variant="dark" onClick={toggleVisibility}>hide</Button>
        </Card>
      </div>
    </div>
  )
}

export default Togglable