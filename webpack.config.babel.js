/**
 * Created by v_kaiytian on 2017/3/23.
 */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import extend  from  './shared/utils/extend'
let userClientPath = path.resolve('.');
//webpack 参数 -p 生产打包 -d开发打包
const isDebug = !process.argv.includes('-p');
const publicPath = '/';
let htmlConf = { //根据模板插入css/js等生成最终HTML
    filename: '', //生成的html存放路径，相对于path
    template: '', //html模板路径
    inject: 'body', //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: [],//需要引入的chunk，不配置就会引入所有页面的资源
    minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
    }
};
let htmlConfs = [];

htmlConfs.push(new HtmlWebpackPlugin(extend({}, htmlConf, {
    filename: './index.html',
    template: userClientPath + '/client/index.html', //html模板路径
    chunks: ['vendor', 'bundle']
})));

let plugin = isDebug ? [
    new webpack.HotModuleReplacementPlugin(),
    ...htmlConfs,//页面
    new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
] : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    ...htmlConfs,//页面
    /**
     * 压缩混淆
     */
    new UglifyJsPlugin({
        // // 删除所有的注释
        extractComments: true,
        sourceMap: true,
        uglifyOptions: {
            ecma: 8
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js'}),
    /**
     * 提取css
     */
    new ExtractTextPlugin('[name].css'),
    /**
     * 进一步使用gzip压缩
     */
    new CompressionPlugin({
        deleteOriginalAssets: true
    })
]
const wpClientConfig = {
    /**
     *entry 值为对象每个key代表一个页，key对应的值代表这个页的主js；值为数组代表将数组中的所有路径指向的js打包成一个js文件；值为字符串就是单一入口文件
     *babel-polyfill babel补丁 用于开启全部es6特性，必须在entry最开始出引入
     *
     */
    entry: {
        bundle: ['babel-polyfill',userClientPath + '/client/index.js'],
        vendor: ['react','react-dom','redux','axios','react-router','react-router-dom'],
        assets: [userClientPath + '/shared/assets/index.js'],
    },
    /**
     * webpack dev server 启动配置
     */
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8080,
    },
    output: {
        filename: '[name].js',
        //浏览器访问页面的路径
        //连接静态资源的路径要是一个绝对路径
        chunkFilename:'[name].js',
        publicPath: isDebug ? '/' : publicPath,
        path: userClientPath + '/dist'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    },
    devtool: isDebug ? 'inline-source-map' : '',
    module: {
        rules: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                // 使用babel-loader不要使用babel否则有可能报错 Error: The node API for `babel` has been moved to `babel-core`.
                loader: 'babel-loader'
            },
            {
                test: /\.(html|htm)$/,
                loader: 'html-loader'
            },
            /**
             * 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
             * 10k以下的base64处理
             */
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
                loader: `url-loader?name=statistic/[name][base64:8].[ext]&limit=10`,
            },
            /**
             * 文件加载器，处理文件静态资源
             */
            {
                test: /\.(eot|ttf|wav|mp3|mp4)$/,
                loader: `file-loader?name=statistic/[name][base64:8].[ext]&limit=10000`,
            },
            {
                test: /\.(json)$/,
                loader: `file-loader?name=[name].[ext]`,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // CSS Loader https://github.com/webpack/css-loader
                            importLoaders: 1,
                            sourceMap: isDebug,
                            // CSS Modules https://github.com/css-modules/css-modules
                            localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
                            // CSS Nano http://cssnano.co/options/
                            minimize: !isDebug,
                            discardComments: {removeAll: true},
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                ],
            },
            /**
             * 支持sass less postCss处理
             */
            {
                test: /\.less$/,
                use: isDebug ? [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'postcss-loader'},
                    {loader: 'less-loader'},
                ] : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            }

        ]
    },
    stats: {
        colors: true,
        timings: true,
    },
    plugins: [...plugin]
};
export default wpClientConfig;
