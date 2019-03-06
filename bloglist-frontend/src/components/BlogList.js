import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, setNotification, setNotificationType, user }) => {

  blogs.sort((blog1, blog2) => (blog2.likes - blog1.likes))

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} setNotification={setNotification} setNotificationType={setNotificationType} user={user} />
      )}
    </div>
  )
}

export default BlogList