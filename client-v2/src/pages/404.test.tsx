import React from "react";
import NotFoundPage from "./404";
import { render } from '@testing-library/react'

describe('NotFoundPage', () => {

    describe('Rendering', () => {

        it('renders an h1 tag', () => {

            // Somehow mock the <Layout> so we can test the page components? 🤔

            // const { container } = render(<NotFoundPage />)

            // console.log(container)

            // expect(container).toContain(h1 with text "Not Found")

        });
    })
});
