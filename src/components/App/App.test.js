import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('check if smashicon title exists' , () => {
    const {getByText} = render(<App />);
    getByText('Smashicon');
})
