import userService from '../services/users'

const initialState = { userLoggedIn: null, users: [] }

const userReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_USER_LOGGED_IN':
      return { ...state, userLoggedIn: action.userLoggedIn }
    case 'CLEAR_USER_LOGGED_IN':
      return { ...state, userLoggedIn: null }
    case 'INIT_USERS':
      return { ...state, users: action.users }
    default:
      return state
  }
}

export const setUserLoggedIn = (user) => {
  return {
    type: 'SET_USER_LOGGED_IN',
    userLoggedIn: user
  }
}

export const clearUserLoggedIn = () => {
  return {
    type: 'CLEAR_USER_LOGGED_IN'
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users: data
    })
  }
}




export default userReducer