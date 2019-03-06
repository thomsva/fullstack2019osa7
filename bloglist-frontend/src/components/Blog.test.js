import React from 'react'
//import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'


test('renders content before and after clicking title', () => {
  const blog = {
    title: 'Hello blog',
    author: 'Aku Ankka',
    likes: '123456',
    url: 'www.www.www',
    user: { name: 'test' }
  }
  const testUser = {
    name: 'test'
  }

  const component = render(
    <Blog blog={blog} user={testUser} />
  )

  //component.debug()

  //testing that title renders correctly
  expect(component.container).toHaveTextContent('Hello blog')
  //testing that author renders correctly
  expect(component.container).toHaveTextContent('Aku Ankka')
  //testing number of likes
  expect(component.container).toHaveTextContent('123456')

  //test that details are hidden before clicking
  const div = component.container.querySelector('.details')
  expect(div).toHaveStyle('display: none')



  //testing that details are visible after clicking title
  const clickableTitle = component.container.querySelector('.title')
  fireEvent.click(clickableTitle)
  //component.debug()
  const div2 = component.container.querySelector('.details')
  expect(div2).not.toHaveStyle('display: none')


})