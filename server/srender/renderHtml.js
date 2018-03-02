/**
 * Created by tiankaiyuan on 2018/2/27.
 */
import serialize from 'serialize-javascript';
export  default (componentHtml = '', metaData = {}, initState) => {
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
    <title>${title || 'react组件库'}</title>
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
    <link href="/bundle.css" rel="stylesheet">
    <link rel="manifest" href="/manifest.json">
</head>
<body>
<div id="app">${componentHtml}</div>
<script type="text/javascript">
    window.__INITIAL_STATE__ = ${serialize(initState, {isJSON: true})}
</script>
<script type="text/javascript" src="/vendor.js"></script>
<script type="text/javascript" src="/bundle.js"></script>
</body>
</html>`;
};