/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {hydrate} from 'react-dom'
import  {Provider} from 'react-redux'
import  {BrowserRouter} from 'react-router-dom'
import createStore from '../shared/store'
import Root      from '../shared/containers/Root'
const preStore = window.__INIT_STATE__;
const store = createStore(preStore);
hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);