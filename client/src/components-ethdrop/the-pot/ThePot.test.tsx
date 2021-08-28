import { ThePot } from './ThePot';
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('ThePot component', () => {

    it('renders an h1 saying it is the input foo', async () => {

        const mockFoo = 'something';

        render(<ThePot foo={mockFoo} />);

        const messageElement = screen.queryByText(`This is ${mockFoo}!`);

        expect(messageElement).not.toBeNull();

    })

    it('renders an h1 saying the pot is nothing', async () => {

        render(<ThePot />);

        const messageElement = screen.queryByText('This is nothing!');

        expect(messageElement).not.toBeNull();

    })

})