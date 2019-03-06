import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setNotification, setNotificationType, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const extractUserName = (user) => {
    if (user === null) return 'unknown'
    return user.name
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = () => {
    blog.likes++
    blogService
      .update(blog)
      .then((response) => {
        console.log('response', response)
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          setBlogs(blogs)
        )
        setNotification('tykkäys lisätty')
        setNotificationType('info')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
      .catch(() => {
        setNotification('tykkäyksen lisääminen epäonnistui')
        setNotificationType('error')
        setTimeout(() => {
          setNotification(null)
        }, 2000)
      })
  }

  const handleRemove = () => {
    if (window.confirm('remove blog ' + blog.title + ' by ' + blog.author + '?')) {
      blogService
        .remove(blog.id)
        .then((response) => {
          console.log('response', response)
        })
        .then(() => {
          blogService.getAll().then(blogs =>
            setBlogs(blogs)
          )
          setNotification('poistaminen onnistui')
          setNotificationType('info')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(() => {
          setNotification('blogin poistaminen epäonnistui')
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
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

export default Blog