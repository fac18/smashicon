import React from 'react';
import { render,fireEvent,act,waitForDomChange } from '@testing-library/react';
import Form from './Form';

test('check if the form works' , () => {
const {getByLabelText,getByText, container} = render(<Form/>)
const inputNode = getByLabelText('Enter your GitHub username')
fireEvent.change(inputNode, {target : {value:'ayub3'}})
const slider = container.querySelector('.form__range')
fireEvent.change(slider , {target : {value: 500}})
const button = getByText('Play!')
const mockResponse = {username:'ayub3', followers: ['svnmmrs' , 'redahaq'] , interval : 500 , avatar_url : 'https://avatars3.githubusercontent.com/u/50529930?s=460&v=4'}
global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ text: () => Promise.resolve(mockResponse) })
    );
    act(()=>{
        fireEvent.click(button)
    })
  
expect(container.firstChild.className).toBe('game')
})



