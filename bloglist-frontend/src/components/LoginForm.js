import React from 'react'

const LoginForm = ({ handleSubmit, username, password }) => {

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus

          <input {...username.bind} />

        </div>
        <div>
          salasana
          <input {...password.bind} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm