
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'LIKE_INCREASE': {
      const id = action.data.blog.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = { ...blogToChange, likes: action.data.blog.likes }
      return state
        .map(blog => blog.id !== id ? blog : changedBlog)
        .sort((a1, a2) => (a2.likes - a1.likes))
    }
    case 'ADD_COMMENT': {
      const blogToChange1 = state.find(b => b.id === action.data.blog.id)
      const changedBlog1 = { ...blogToChange1, comments: action.data.blog.comments }
      return state
        .map(blog => blog.id !== action.data.blog.id ? blog : changedBlog1)
        .sort((a1, a2) => (a2.likes - a1.likes))
    }
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'NEW_BLOG':
      state = state.concat(action.data)
        .sort((a1, a2) => (a2.votes - a1.votes))
      return state
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const likeIncrease = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_INCREASE',
      data: { blog: updatedBlog.data }
    })
  }
}

export const addComment = (id, comment) => {
  console.log('reducer addvcommetn blog', id)
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: { blog: updatedBlog.data }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    console.log('content_', content)
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}



export default blogReducer