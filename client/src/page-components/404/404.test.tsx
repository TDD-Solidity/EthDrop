// import { getNodeText, queryByAttribute, render } from '@testing-library/react'
import NotFoundPageComponent from "./404";
import React, { Dispatch } from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';

describe('NotFoundPageComponent', () => {

    describe('Rendering', () => {

        let mockStore;
        let store: MockStoreEnhanced<unknown, {}>;
        beforeEach(() => {
            mockStore = configureMockStore();

            store = mockStore({ });

        });

        it('renders an h1 tag', () => {

            const tree = renderer
                .create(
                    <Provider store={store}>
                        <NotFoundPageComponent />
                    </Provider>,
                )
                .toJSON() as ReactTestRendererJSON;

            console.log(tree)

            expect(JSON.stringify(tree?.children)).toContain('Not Found');

            tree?.children?.forEach( child => {

                if ((child as any).type === 'h1') {

                    expect((child as any).children[0]).toEqual('Not Found');
                }

            })

        });
    })
});
