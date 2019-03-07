import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const UserList = (props) => {

  if (props.users.users == null) return (<div>empty</div>)

  return (
    <div>
      <h2>List of users</h2>
      <ul>
        {props.users.users.map(u =>
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link> ({u.blogs.length} blogs)
          </li>
        )}
      </ul>

    </div>
  )
}


const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)