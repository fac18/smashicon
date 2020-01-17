import React from 'react';
import { render,fireEvent } from '@testing-library/react';
import Form from './Form';

test('check if the form works' , () => {
const {getByLabelText,getByText, container} = render(<Form/>)
const inputNode = getByLabelText('Enter your GitHub username')
fireEvent.change(inputNode, {target : {value:'ayub3'}})
const slider = container.querySelector('.form__range')
fireEvent.change(slider , {target : {value:1000}})
const button = getByText('Play!')
fireEvent.click(button)
})


