import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const BlogList = (props) => {
  console.log('props:', props)


  if (props.blogs == null) return (<div>empty</div>)

  props.blogs.sort((blog1, blog2) => (blog2.likes - blog1.likes))

  return (
    <div>
      <h2>List of blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={props.user} />
      )}
    </div>
  )

}



const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

export default connect(mapStateToProps, null)(BlogList)