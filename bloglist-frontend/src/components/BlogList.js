import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const BlogList = (props) => {
  console.log('props:', props)


  if (props.blogs == null) return (<div>empty</div>)

  props.blogs.sort((blog1, blog2) => (blog2.likes - blog1.likes))

  return (
    <div>
      <h2>List of blogs</h2>

      <ul>
        {props.blogs.map(blog =>
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}</li>
        )}
      </ul>

    </div>
  )

}



const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps, null)(BlogList)