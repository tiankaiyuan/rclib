const script = process.argv.includes('production') ? [] : [
    {
        script: './webpackStart.js',
        cwd: './', //执行目录
        name: 'webpack',
        error_file: './pm2logs/webpackErrors.log',
        out_file: './pm2logs/webpackOuts.log',
        env: {
            NODE_ENV: 'development',
            BABEL_ENV: 'browser',
        },
        env_production: {
            NODE_ENV: 'production',
            BABEL_ENV: 'browser',
        },
        instance: 1,
        autorestart: false,
        watch: ['./webpackStart.js', './webpack.config.babel.js'], //默认监视执行目录(./)，指定路径不能使用yml文件类型
    }
]
module.exports = {
    apps: [
        {
            script: './server/index.js',
            cwd: './server/',
            name: 'newApp',
            error_file: '../pm2logs/newAppErrors.log',
            out_file: '../pm2logs/newAppOuts.log',
            env: {
                NODE_ENV: 'development',
                BABEL_ENV: 'node',
            },
            env_production: {
                NODE_ENV: 'production',
                BABEL_ENV: 'node',
            },
            instance: 1,
            exec_mode: 'cluster',
            watch: ['./', '../logger', '../shared'], //默认监视执行目录(./)，指定路径不能使用yml文件类型
            ignore_watch: ['log', 'dist']
        },
        ...script
    ]
};
