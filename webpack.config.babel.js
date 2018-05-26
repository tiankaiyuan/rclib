/**
 * Created by v_kaiytian on 2017/3/23.
 */
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

let userClientPath = path.resolve('.');
const isDebug = !process.argv.includes('-p');
const publicPath = '/';

let plugin = isDebug ? [] : [
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
plugin.push(new webpack.DefinePlugin({
    'process.env.BROWSER': true,
    'process.env': {
        NODE_ENV: JSON.stringify(isDebug ? 'development' : 'production')
    }
}));
plugin.push(new webpack.HotModuleReplacementPlugin());
const wpClientConfig = {
    mode: isDebug ? 'development' : 'production',
    /**
     *entry 值为对象每个key代表一个页，key对应的值代表这个页的主js；值为数组代表将数组中的所有路径指向的js打包成一个js文件；值为字符串就是单一入口文件
     *babel-polyfill babel补丁 用于开启全部es6特性，必须在entry最开始出引入
     *
     */
    entry: {
        bundle: [userClientPath + '/client/index.js'],
        assets: [userClientPath + '/shared/assets/index.js'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                bundle: {
                    chunks: "initial",
                    test: "bundle",
                    name: "bundle",
                    enforce: true
                }
            }
        }
    },
    // 以下写法表示，webpack以key过滤目标，然后以value在全局中检索目标。（react-dom以script 引入的全局变量为ReactDOM）
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'react-router-dom': 'ReactRouterDOM',
        axios: 'axios',
        redux: 'Redux'
    },
    output: {
        filename: '[name].js',
        //浏览器访问页面的路径
        //连接静态资源的路径要是一个绝对路径
        chunkFilename: '[name].js',
        publicPath: isDebug ? '/' : publicPath,
        path: userClientPath + '/server/dist'
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
    //慎重使用，为true时编译出错（js文件找不到）时会退出webpack
    // bail: true,
    plugins: [...plugin]
};
export default wpClientConfig;