module.exports = {
    apps: [
        {
            script: './server/index.js',
            cwd: './server/',
            name: 'newApp',
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
            watch: ['./','../logger','../shared'], //默认监视执行目录(./)，指定路径不能使用yml文件类型
            ignore_watch: ['log','dist']
        }
    ]
};
