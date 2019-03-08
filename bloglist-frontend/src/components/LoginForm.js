import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, username, password }) => {

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>käyttäjätunnus</Form.Label>
          <Form.Control id='username' {...username.bind} />
          <Form.Label>salasana</Form.Label>
          <Form.Control id='password' {...password.bind} />
        </Form.Group>
        <Form.Group>
          <Button variant="dark" type="submit">kirjaudu</Button>
        </Form.Group>


      </Form>
    </div>
  )
}

export default LoginForm