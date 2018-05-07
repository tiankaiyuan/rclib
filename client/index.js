/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {render} from 'react-dom'
import  {Provider} from 'react-redux'
import  {BrowserRouter} from 'react-router-dom'
import createStore from '../shared/store'
import Root      from '../shared/containers/Root'
const store = createStore();
render(
    <Provider store={store}>
        <BrowserRouter>
            <Root/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
