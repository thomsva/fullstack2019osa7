import React from 'react'


const User = (props) => {

  if (props.user == null) return (<div>empty</div>)

  return (
    <div>
      <h2>User {props.user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {props.user.blogs.map(b =>
          <li key={b.id}>
            {b.title}
          </li>
        )}
      </ul>


    </div>
  )
}



export default User