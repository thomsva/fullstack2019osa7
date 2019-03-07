import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {

  if (props.users.users == null) return (<div>empty</div>)

  return (
    <div>
      <h2>List of users</h2>
      <ul>
        {props.users.users.map(u =>
          <li key={u.id}>{u.name} ({u.blogs.length} blogs)</li>
        )}
      </ul>

    </div>
  )
}


const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)