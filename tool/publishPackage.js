/**
 * created by tiankaiyuan on 2018/5/17
 */
/**
 * 第一个参数选择要生成的package的类型 api/page 第二个参数是package放置路径
 */
const fs = require('fs');
const pk = require('../package');
const arg = process.argv.slice(2);

const filerPkApi = ['axios', 'react', 'redux', 'devDependencies', 'pub'],
    scriptsApi = {
        start: "pm2 start apiServer.config.js",
        pro: "pm2 start apiServer.config.js --env production"
    },
    filerPkPage = ['devDependencies'],
    scriptsPage = {

    },
    filerPk = [],
    prop = ['dependencies', 'devDependencies'];
const pkOption = (filer, script) => {
    pk.scripts = {
        ...pk.scripts,
        ...script
    };
    for (let key in pk.scripts) {
        if (pk.scripts.hasOwnProperty(key)) {
            if (filer.includes(key)) {
                delete pk.scripts[key];
            }
        }
    }
    prop.forEach((value) => {
        if (filer.includes(value)) {
            delete pk[value];
            return;
        }
        for (let key in pk[value]) {
            if (pk[value].hasOwnProperty(key)) {
                filer.forEach((_value) => {
                    if (key.match(new RegExp('^' + _value))) {
                        delete pk[value][key];
                    }
                })
            }
        }
    })
};
if (arg[0] === 'api') {
    pkOption([...filerPk, ...filerPkApi], scriptsApi);
} else {
    pkOption([...filerPk, ...filerPkPage], scriptsPage);
}
fs.writeFile(arg[1], JSON.stringify(pk), (err) => {
    if (err) {
        console.log(err)
    }
});