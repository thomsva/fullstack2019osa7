import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeIncrease } from '../reducers/blogReducer'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'


const Blog = (props) => {
  console.log('Blog props', props)
  if (props.blog == null) return (<div>empty</div>)

  const [redirect, setRedirect] = useState(null)

  const extractUserName = (user) => {
    if (user === null) return 'unknown'
    return user.name
  }

  const handleLike = () => {
    props.likeIncrease(props.blog)
  }

  const handleRemove = () => {
    if (window.confirm('remove blog ' + props.blog.title + ' by ' + props.blog.author + '?')) {
      console.log('remove id', props.blog.id)
      props.removeBlog(props.blog.id)
      props.setNotification('Blog removed', 3)
      setRedirect('/')
    }
  }

  const showForOwner = { display: (props.blog.user.name === props.userLoggedIn.name) ? '' : 'none' }


  if (redirect !== null) {
    return <Redirect to={redirect} />
  }

  return (
    <div>

      <h3 className='title'>{props.blog.title} by {props.blog.author}</h3>

      <div><a href={props.blog.url}>{props.blog.url}</a></div>
      <div>likes: {props.blog.likes} <button onClick={handleLike}>like</button> </div>
      <div>added by {extractUserName(props.blog.user)}</div>
      <button onClick={handleRemove} style={showForOwner}>remove</button>

      <h4>Comments</h4>
      <ul>
        {props.blog.comments.map((c, i) =>
          <li key={i}>{c}</li>
        )}
      </ul>

    </div >
  )
}

const mapStateToProps = (state) => {
  return { userLoggedIn: state.users.userLoggedIn }
}

export default connect(
  mapStateToProps, { removeBlog, setNotification, likeIncrease }
)(Blog)


