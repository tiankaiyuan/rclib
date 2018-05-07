/**
 * Created by tiankaiyuan on 2017/9/8.
 */
/**
 * 返回url中最后一个／后面的内容
 * @param str
 * @returns {*}
 */
const MODEL_NAME = 'utils';
exports.getUrlLastItem = (str) => {
    return str.split('/').slice(-1)[0];
};
/**
 * 提取url中的域名
 * @param url
 * @returns {*}
 */
exports.parseDomain = (url) => {
    if (typeof url !== 'string') {
        throw 'param need a string'
    }
    let domain = url;
    if (url.indexOf(':') !== -1) {
        domain = url.slice(url.indexOf(':') + 3);
    }
    if (domain.indexOf('/') !== -1) {
        domain = domain.slice(0, domain.indexOf('/'));
    }
    //去掉.com
    if (domain.lastIndexOf('.') !== -1) {
        domain = domain.slice(0, domain.indexOf('.'));
    }
    //去掉子域
    if (domain.lastIndexOf('.') !== -1) {
        domain = domain.slice(0, domain.indexOf('.'));
    }
    return domain;
};

/**
 * 生成token
 * @param jwt json web  token 库
 * @param option
 * @param payload
 * @param secret
 */
exports.createToken = (jwt, payload = {}, secret, option = {}) => new Promise((resolve, reject) => {
    jwt.sign(payload, secret, option, function (err, token) {
        if (err) {
            reject(err);
        }
        resolve(token)
    })
});
/**
 * 验证token
 * @param jwt json web  token 库
 * @param secret
 * @param token
 */
exports.verifyToken = (jwt, token, secret) => new Promise((resolve, reject) => {
    jwt.verify(token, secret, function (err, decode) {
        if (err) {
            reject(err);
        }
        resolve(decode)
    })
});

/**
 * 清理指定文档
 * @param db
 */
exports.clear = db => doc => (item = {}) => {
    try {
        return db[doc].remove(item);
    } catch (err) {
        throw errorMsg(MODEL_NAME, 'clear', err);
    }
};

const isArray = arr => arr instanceof Array;
const isObject = obj => (typeof obj === 'object') && !isArray(obj);

exports.isEmpty = (obj) => {
    if (typeof obj !== 'object') {
        throw Error('isEmpty 参数不正确')
    }
    if (isArray(obj)) {
        throw Error('isEmpty 参数不正确')
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true;
};

exports.isArray = isArray;
exports.isObject = isObject;

/**
 * 获取随机数
 * @param max
 * @param min
 * @returns {*}
 */
const getRandom = (max, min) => {
    if (typeof max !== 'number' || typeof min !== 'number') {
        throw 'param type need number'
    }
    return Math.trunc(Math.random() * (max - min) + min);
};
exports.getRandom = getRandom;
/**
 * 返回一个 当前时间加上拼上随机3位数的一个时间戳
 * @returns {number}
 */
exports.getTimestamp = () => {
    return Number(Date.now() + '' + getRandom(1000, 100))
};
/**
 * 统一的错误处理
 * @param err
 */
exports.handleError = (err) => {
    console.log(err);
}
const errorMsg = (modelName, fnName, err) => {
    return modelName + ' ' + fnName + ' ===> ' + err
}
exports.errorMsg = errorMsg;
/**
 * 通过promise 封装的读文件方法
 * @param path
 */
const pReadFile = path => new Promise((resolve, reject) => {
    let fs = require('fs');
    fs.readFile(path, {encoding: 'utf8'}, (err, data) => {
        if (err) return reject(errorMsg('', 'pReadFile', err));
        resolve(data);
    });
});
exports.readLine = (readFile, writeFile, option = {}) => {
    const fs = require('fs'), readLine = require('readline');
    try {
        const rdStream = fs.createReadStream(readFile, option.rOption || {}),
            wtStream = fs.createWriteStream(writeFile, option.wOption || {});
        const RLine = readLine.createInterface({
            input: rdStream,
            crlfDelay: Infinity
        });
        RLine.write = wtStream.write.bind(wtStream);
        return RLine
    } catch (err) {
        throw 'readLine has some err:' + err
    }
}
exports.pReadFile = pReadFile;
/**
 * 通过promise 封装的写文件方法
 * @param data
 * @param option
 * @param path
 */
exports.pWriteFile = (path, data, option) => new Promise((resolve, reject) => {
    let fs = require('fs');
    fs.writeFile(path, data, option, (err) => {
        if (err) return reject(errorMsg('', 'pWriteFile', err));
        resolve();
    });
})
/**
 * 通过promise 封装的监视方法，并返回改变后的值
 * @param option
 * @param path
 */
exports.pWatchUntilChange = (path, option) => new Promise((resolve, reject) => {
    try {
        let fs = require('fs');
        let watcher = fs.watch(path, option, () => {
            watcher.close();
            setTimeout(() => {
                try {
                    pReadFile(path).then(data => {
                        resolve(data);
                    });
                } catch (err) {
                    return reject(errorMsg('', 'pWatchUntilChange', err));
                }
            }, 0);

        });
    }
    catch (err) {
        return reject(errorMsg('', 'pWatchUntilChange', err));
    }
})
/**
 * 包装一个函数为promise形式
 * @param fn
 * @returns {Promise}
 */
exports.promiseH = (fn) => new Promise(fn);
/**
 * 使用superagent加载页面
 * @param url
 * @param proxy
 * @param delay
 */
exports.loadUrl = (url, delay = 0, proxy) => new Promise((res, rej) => {
    let request = require('superagent');
    require('superagent-proxy')(request);
    setTimeout(() => {
        let req = request.get(url);
        if (proxy) {
            req = req.proxy(proxy);
        }
        req.timeout({
            response: 15000,
            deadline: 15000,
        })
            .end(async (err, sour) => {
                try {
                    if (err || !sour) {
                        return rej(errorMsg('utils', 'loadUrl: ' + url, err));
                    }
                    if (sour.status != 200) {
                        return rej(errorMsg('utils', 'loadUrl: ' + url, sour.status))
                    }
                    res(sour)
                } catch (err) {
                    throw errorMsg('utils', 'loadUrl', err);
                }
            });
    }, delay)
});
/**
 * 截取字符串长度为len
 * @param target
 * @param len
 * @returns {*}
 */
exports.comp = (target, len) => {
    return target.length > len ? target.slice(0, len) : target
}

/**
 * 根据环境输出打印
 * @param param
 */
exports.console = (...param) => {
    if (process.env.NODE_ENV === 'production') {
        return;
    }
    console.log(...param)
};
/**
 * 通过描述解出数据 如 12k 返回12000
 * @param string
 * @returns {Number|number}
 */
exports.parserNumFromDesc = (string) => {
    let num = parseInt(string) || 0;
    if (string.includes('w')) {
        num = num * 10000
    } else if (string.includes('k')) {
        num = num * 1000
    }
    return num;
};

/**
 * 解密
 * @param data
 * @param code
 * @returns {string|Buffer}
 */
exports.decrypt = (data, code) => {
    const crypto = require('crypto');
    const decipher = crypto.createDecipher('aes192', code);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
/**
 * 加密
 * @param data
 * @param code
 * @returns {Buffer|string}
 */
exports.encrypt = (data, code) => {
    const crypto = require('crypto');
    const cipher = crypto.createCipher('aes192', code);
    //update final两个阶段的数据要拼起来 否则解密会失败
    // utf8 是输入字符的编码，hex 是输出的编码
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
/**
 * 检测url 是否被重定向，是则返回重定向后的url
 * @param url
 * @param delay
 */
exports.isRedirect = (url, delay = 0) => new Promise((res, rej) => {
    setTimeout(() => {
        try {
            let protocol = url.split('://')[0];
            const request = require(protocol);
            let req = request.get(url, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400) {
                    //释放掉相应数据占的内存
                    response.resume();
                    return res(response.headers.location)
                }
                res(false)
            });
            // http/https 直接的请求，错误try catch 无法捕获
            req.on('error', err => rej(errorMsg('', 'isRedirect: ' + url, err)))
        }
        catch (err) {
            return rej(errorMsg('', 'isRedirect', err))
        }
    }, delay)
});

