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

            store = mockStore({});

        });
    })
});
