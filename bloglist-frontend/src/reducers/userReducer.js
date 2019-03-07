const initialState = { user: null }

const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_USER':
      return { user: action.user }
    case 'CLEAR_USER':
      return { user: null }
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}




export default userReducer