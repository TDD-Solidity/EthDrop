// import React from "react";
// // import { getNodeText, queryByAttribute, render } from '@testing-library/react'
// import NotFoundPageComponent from "./404";
// import { Provider } from "react-redux";

// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

// import { mount } from 'enzyme';

// Redux II, way 1: Use our own Redux store
// import { createStore, applyMiddleware } from 'redux';
// import combinedReducers from '../state/reducers/root-reducer';
// const createStoreWithMiddleware = applyMiddleware()(createStore);

// Redux II, way 2: Use a mock Redux store
// import configureMockStore from "redux-mock-store";
// import NotFoundPage from "./404";
// const mockStore = configureMockStore();
// const store = mockStore({});

// describe('NotFoundPageComponent', () => {

//     describe('Rendering', () => {

//         let mockStore

//         let component
//         beforeEach(() => {
            // mockStore = createStore(combinedReducers);

        //     component = mount(<Provider store={store}><NotFoundPage /></Provider>);

        // })

        // it('renders an h1 tag', () => {

        //     const { container } = render(
        //         <Provider store={mockStore}>
        //             <NotFoundPageComponent />
        //             </Provider> 
        //             )

        //     const actualText = queryByAttribute

        //     const h1Text = getNodeText(container.querySelectorAll('h1')[0])

        //     expect(h1Text).toEqual("Not Found")

        // });

//         it('renders an h1 tag', () => {

//             console.log(component.find('h1'))
//             // expect(component.find('h1').length).toBe(1);
//         });

//     });

// });




// import { getNodeText, queryByAttribute, render } from '@testing-library/react'
import NotFoundPage from "./404";
import React, { Dispatch } from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { LOGIN_REQUESTED, LOGOUT } from '../state/types/login';
import { AnyAction } from 'redux';

// import { useStaticQuery } from "gatsby";
import * as gatsby from "gatsby";

describe('NotFoundPageComponent', () => {
    
    describe('Rendering', () => {
        
        beforeAll(() => {

            jest.spyOn(gatsby, 'useStaticQuery').mockReturnValue({
                "site": {
                    "siteMetadata": {
                      "author": "Your Name Here"
                    }
                  },
                configJson: {
                    footer: {
                        copyright_text: 'copyright_text'
                    },
                },
                allSocialJson: {
                    edges: [{ node: {name: 'name', link: 'link' }}]
                },
                allFooterMenuJson: {
                    edges: [{ node: { url: 'url', name: 'name' } }]
                }
                
            });
        });

        let mockStore;
        let store: MockStoreEnhanced<unknown, {}>;
        beforeEach(() => {
            mockStore = configureMockStore();

            store = mockStore({ });

        });

        xit('renders an h1 tagg', () => {

            const tree = renderer
                .create(
                    <Provider store={store}>
                        <NotFoundPage />
                    </Provider>,
                )
                .toJSON() as ReactTestRendererJSON;

            console.log(tree)

            expect(tree?.children).toContain('Not Found');

        });
    })
});

