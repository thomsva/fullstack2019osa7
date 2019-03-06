const initialState = { text: null }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.text }
    case 'REMOVE_NOTIFICATION':
      return { text: null }
    default:
      return state
  }
}

export const setNotification = (text, seconds) => {
  return async dispatch => {
    console.log('actioncreator')
    dispatch({
      type: 'SET_NOTIFICATION',
      text: text
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        text: text
      })
    }, seconds * 1000)
  }
}

export const notificationChange = text => {
  return {
    type: 'SET_NOTIFICATION',
    text: text
  }
}

export const notificationRemove = text => {
  return {
    type: 'REMOVE_NOTIFICATION',
    text: text
  }
}

export default notificationReducer