import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('check if the form works' , () => {
  const { getByLabelText, getByText, findByText, container, debug } = render(<Form/>)
  const inputNode = getByLabelText('Enter your GitHub username')
  fireEvent.change(inputNode, {target : {value:'ayub3'}})
  const slider = container.querySelector('.form__range')
  fireEvent.change(slider , {target : {value: 500}})
  const button = getByText('Play!')
  // mock fetch for both API calls made by Form component on submission
  const mockUserResponse = {username:'ayub3', followers_url: '' , interval : 500 , avatar_url : 'https://avatars3.githubusercontent.com/u/50529930?s=460&v=4'}
  const mockFollowersResponse = [{login:'svnmmrs'}, {login:'redahaq'}]
  global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ status: 200, json: () => Promise.resolve(mockUserResponse) })
      )
      .mockImplementationOnce(() => {
        Promise.resolve({ status: 200, json: () => Promise.resolve(mockFollowersResponse)})
      })
  fireEvent.click(button)
  return findByText('0') // look for score of 0 once Form unmounted and Game mounted
})
