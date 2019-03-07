import React from 'react'
import { connect } from 'react-redux'

const UserList = (props) => {

  if (props.users.users === null) return (<div>empty</div>)

  return (
    <div>
      <h2>List of users</h2>
      <ul className="list-group">
        {props.users.users.map(u =>
          <a href={`/users/${u.id}`} className="list-group-item list-group-item-action list-group-item-light" key={u.id}>
            {u.name} ({u.blogs.length} blogs)
          </a>
        )}
      </ul>

    </div>
  )
}


const mapStateToProps = (state) => {
  return { users: state.users }
}

export default connect(mapStateToProps, null)(UserList)