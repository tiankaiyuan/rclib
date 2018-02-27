/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import React from 'react'
import {renderToString}    from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import createStore from '../../shared/store';
import Root        from '../../shared/containers/Root'
import renderHtml from './renderHtml'
export default async(ctx, next) => {
    let url = ctx.request.url;
    if (url === '/') {

    }
    let urlArr = url.split('/');
    if (urlArr[urlArr.length - 1].includes('.') && !urlArr[urlArr.length - 1].includes('.html')) {
        return next();
    }
    const store = createStore();
    let context = {};
    const componentHtml = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.url} context={context}>
                <Root/>
            </StaticRouter>
        </Provider>
    );
    if (context.url) {
        ctx.redirect(context.url);
    }
    ctx.type = 'text/html';
    ctx.body = renderHtml(componentHtml);
}