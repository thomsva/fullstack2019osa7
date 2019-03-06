import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeIncrease } from '../reducers/blogReducer'

const Blog = ({ blog, removeBlog, likeIncrease, setNotification, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const extractUserName = (user) => {
    if (user === null) return 'unknown'
    return user.name
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    likeIncrease(blog)
  }

  const handleRemove = () => {
    if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author + '?')) {
      console.log('remove id', blog.id)
      removeBlog(blog.id)
      setNotification('Blog removed', 3)
    }
  }

  const details = { display: showDetails ? '' : 'none' }
  const showForOwner = { display: (blog.user.name === user.name) ? '' : 'none' }

  return (
    <div className='blog'>
      <div onClick={toggleShowDetails}><h2 className='title'>{blog.title} by {blog.author}</h2></div>
      <div style={details} className='details'>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>likes: {blog.likes} <button onClick={handleLike}>like</button> </div>
        <div>added by {extractUserName(blog.user)}</div>
        <button onClick={handleRemove} style={showForOwner}>remove</button>
      </div>
    </div >
  )
}

export default connect(
  null, { removeBlog, setNotification, likeIncrease }
)(Blog)


