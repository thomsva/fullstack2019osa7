const blogs = [{
  author: 'test author',
  title: 'test blog',
  url: 'www',
  likes: 100,
  user: {
    username: 'testuser',
    name: 'Test',
    id: '123'
  },
  id: '123'
},
{
  author: 'test author',
  title: 'test blog 2',
  url: 'www',
  likes: 100,
  user: {
    username: 'testuser',
    name: 'Test',
    id: '123'
  },
  id: '124'
}
]


const setToken = () => (null)

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }