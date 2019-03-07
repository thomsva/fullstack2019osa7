
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('eka')
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  console.log('toka')
  return response
}


const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}


export default { getAll, setToken, create, update, remove, addComment }