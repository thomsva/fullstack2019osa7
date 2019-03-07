import React from 'react'
import { connect } from 'react-redux'
import { Badge } from 'react-bootstrap'

const BlogList = (props) => {
  console.log('props:', props)


  if (props.blogs === null) return (<div>empty</div>)

  props.blogs.sort((blog1, blog2) => (blog2.likes - blog1.likes))

  return (
    <div>
      <h2>List of blogs</h2>

      <ul className="list-group">
        {props.blogs.map(blog =>
          <a href={`/blogs/${blog.id}`} className="list-group-item list-group-item-action list-group-item-light" key={blog.id}>
            {blog.title} by {blog.author}
            <Badge variant="secondary text-right ml-1">{blog.likes} likes</Badge>
          </a>
        )}
      </ul>

    </div>
  )
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps, null)(BlogList)