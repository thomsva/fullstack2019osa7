import React from 'react'
//import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

//afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Hello blog',
    author: 'Aku Ankka',
    likes: '123456',
    url: 'www.www.www'
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  //component.debug()

  //testing that contents renders correctly
  expect(component.container).toHaveTextContent('Hello blog')

  const likesDiv = component.container.querySelector('.likes')
  expect(likesDiv).toHaveTextContent('123456')

  const titleDiv = component.container.querySelector('.title')
  expect(titleDiv).toHaveTextContent('Aku Ankka')


  //testing that two clicks on like button calls function twice
  const { getByText } = render(
    < SimpleBlog blog={blog} onClick={mockHandler} />
  )
  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)

})