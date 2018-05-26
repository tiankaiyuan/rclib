/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import serialize from 'serialize-javascript';

const getCdn = (target) => {
    let cdn = {
        react: "https://cdn.bootcss.com/react/16.3.2/umd/react.production.min.js",
        reactDom: "https://cdn.bootcss.com/react-dom/16.3.2/umd/react-dom.production.min.js",
        redux: "https://cdn.bootcss.com/redux/4.0.0/redux.min.js",
        reactRouter: "https://cdn.bootcss.com/react-router/4.2.0/react-router.min.js",
        reactRouterDom: "https://cdn.bootcss.com/react-router-dom/4.2.2/react-router-dom.min.js",
        babelPolyfill: "https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js",
        axios: "https://cdn.bootcss.com/axios/0.18.0/axios.min.js"
    }, devCdn = {
        react: "https://cdn.bootcss.com/react/16.3.2/umd/react.development.js",
        reactDom: "https://cdn.bootcss.com/react-dom/16.3.2/umd/react-dom.development.js",
        redux: "https://cdn.bootcss.com/redux/4.0.0/redux.js",
        reactRouter: "https://cdn.bootcss.com/react-router/4.2.0/react-router.js",
        reactRouterDom: "https://cdn.bootcss.com/react-router-dom/4.2.2/react-router-dom.js",
        babelPolyfill: "https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.js",
        axios: "https://cdn.bootcss.com/axios/0.18.0/axios.js"
    };
    if (process.env.NODE_ENV === 'production') {
        return cdn[target]
    }
    return devCdn[target];
};
export default (componentHtml = '', metaData = {}, initState) => {
    let title = metaData.title;
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="react组件库">
    <meta name="keywords" content="react,组件,node,服务端渲染,同构">
    <meta name="theme-color" content="#f4f5f5">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
    <meta name="format-detection" content="telephone=no,email=no,address=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>${title || '自由组合'}</title>
    <style>
        body, button, div, h1, h2, h3, h4, h5, h6, html, input, li, p, section, table, td, textarea, th, ul {
            padding: 0;
            margin: 0
        }
    
        ul {
            list-style: none
        }
    
        html {
            font-family: MicrosoftYaHei, "Helvetica Neue", Helvetica, Arial, sans-serif;
            background-color: #f4f5f5;
            font-size: 12px
        }
    
        button, img, input, select {
            border: none;
            outline: 0
        }
    
        button {
            background: 0 0;
            cursor: pointer
        }
    
        a {
            text-decoration: none
        }
    </style>
    <link rel="icon" href="/static/favicon[base64:8].ico" type="image/x-icon"/>
    <link href="/bundle.css" type="text/css" rel="stylesheet">
    <link rel="manifest" href="/manifest.json">
</head>
<body>
<div id="app">${componentHtml}</div>
<script type="text/javascript">
    window.__INITIAL_STATE__ = ${serialize(initState, {isJSON: true})}
</script>
<script type="text/javascript"  src="${getCdn('babelPolyfill')}"></script>
<script type="text/javascript"  src="${getCdn('react')}"></script>
<script type="text/javascript"  src="${getCdn('reactDom')}"></script>
<script type="text/javascript"  src="${getCdn('redux')}"></script>
<script type="text/javascript"  src="${getCdn('reactRouter')}"></script>
<script type="text/javascript"  src="${getCdn('reactRouterDom')}"></script>
<script type="text/javascript"  src="${getCdn('axios')}"></script>
<script type="text/javascript"  src="/bundle.js"></script>
</body>
</html>`;
};