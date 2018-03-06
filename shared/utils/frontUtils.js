/**
 * Created by ken on 2017/6/6.
 */
export const parseUrl = (url, key) => {
    if (typeof url !== 'string') {
        return;
    }
    let paramString = url.split('?')[1];
    if (!paramString) {
        return;
    }
    let paramsArr = paramString.split('&'), paramObj = {};
    for (let i = 0; i < paramsArr.length; i++) {
        let param = paramsArr[i].split('=');
        paramObj[param[0]] = param[1];
    }
    return paramObj[key];
}
export const isArray = arr => arr instanceof Array;
export const isEmpty = (obj) => {
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
const isObject = obj => (typeof obj === 'object') && !isArray(obj);
const isFunc = func => typeof func === 'function';
/**
 * @keys array 表示要操作对象的key的集合从左到右对应对象key由外到内
 * @option array 对应keys 是要操作key的函数集合，如下函数书写事例,只有一个函数会自动对应keys中的最后一个key
 * const optionList = key => next => obj => {
 *   return {
 *       [key]: {
 *          ...obj[key],
 *          ...next(obj[key]),
 *          xxx:'xxx'//要修改的字段
 *       }
 *     }
 *  };
 *
 */
export const applyOption = (keys, options) => {
    if (!(keys instanceof Array) || !(options instanceof Array)) {
        throw Error('arg need both array');
    }
    let arrOptions = false;
    const optionList = key => next => obj => {
        return {
            [key]: {
                ...obj[key],
                ...next(obj[key])
            }
        }
    };
    if (keys.length !== options.length) {
        arrOptions = new Array(keys.length - options.length).fill(optionList);
    }
    const localOptions = arrOptions ? [...arrOptions, ...options] : [...options],
        localKeys = [...keys];
    let nextList = localOptions.map((f, index) => f(localKeys[index]));

    const optionEntity = next => obj => {
        return {
            ...obj,
            ...next(obj)
        }
    };
    nextList = nextList.reverse();
    nextList.push(optionEntity);
    const first = nextList[0];
    nextList = nextList.slice(1);
    return nextList.reduce((compose, f) => {
        return f(compose);
    }, first(() => {
    }));
};
/**
 * 深度拷贝
 * @param target 要考入数据的目标 根据被拷贝数据类型决定
 * @param param  被拷贝数据
 * @returns {*}
 */
export const superExtends = (target, param) => {
    if (isObject(param)) {
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                if (isObject(param[key])) {
                    target[key] = superExtends({}, param[key])
                } else if (isArray(param[key])) {
                    target[key] = superExtends([], param[key])
                } else {
                    target[key] = param[key]
                }
            }
        }
    } else if (isArray(param)) {
        for (let i = 0; i < param.length; i++) {
            if (isArray(param[i])) {
                target[i] = superExtends([], param[i])
            } else if (isObject(param[i])) {
                target[i] = superExtends({}, param[i])
            } else {
                target[i] = param[i];
            }
        }
    } else {
        target = param;
    }
    return target;
};
/**
 *
 * @param baseMonth 月份 注意月份是从0开始的
 * @param baseDate 日期
 * @param isLastWeek 是否是截止到上周
 * @returns {{}}
 */
export const serializationWeek = (baseMonth = 6, baseDate = 5, isLastWeek = true) => {
    let weekTime = 7 * 24 * 60 * 60 * 1000, today = new Date(),
        baseDay = new Date(today.getFullYear(), baseMonth - 1, baseDate, 0, 0, 0),
        toFirstMonday = 8 - new Date(today.getFullYear(), 0, 1, 0, 0, 0).getDay(),
        toBaseDayTime = baseDay.getTime() - new Date(baseDay.getFullYear(), 0, 1 + toFirstMonday, 0, 0, 0).getTime(),
        baseWeekNum = Math.ceil(toBaseDayTime / weekTime),
        toTodayWeekNum = Math.ceil((today.getTime() - baseDay.getTime()) / weekTime);
    if (isLastWeek) {
        toTodayWeekNum -= 1;
    }
    let serialWeek = {};
    for (let i = 0; i < toTodayWeekNum; i++) {
        serialWeek[baseWeekNum + i] = (new Date(baseDay.getTime() + i * weekTime).getMonth() + 1) +
            '.' +
            new Date(baseDay.getTime() + i * weekTime).getDate() +
            '-' +
            (new Date(baseDay.getTime() + (i + 1) * weekTime - 1).getMonth() + 1) +
            '.' +
            new Date(baseDay.getTime() + (i + 1) * weekTime - 1).getDate();
    }
    return serialWeek;
};

/**
 * 返回插入逗号的数字
 * @param num
 */
export const parserNum = (num) => {
    let numArr = num.toString().split('') || [], len = numArr.length;
    if (len <= 3) {
        return num;
    }
    return numArr
        .reduceRight((pre, value, index) => (len - index) % 3 === 0 ? pre + value + ',' : pre + value, '')
        .split('')
        .reverse();
}
/**
 *
 * @param num
 * @param bits 小数点后位数
 * @param needString 是否需要返回string类型
 * @returns {*}
 */
export const superToFixed = (num, bits, needString) => {
    if (needString) {
        return num.toFixed(bits);
    } else {
        return Number(num.toFixed(bits))
    }
}
/**
 * 判断设备型号
 * @param target
 */
export const checkDevice = (target) => {
    let userAgent = navigator.userAgent;
    return new RegExp(target, 'i').test(userAgent)
};

export const isAndroid = () => {
    return checkDevice('Android');
}
export const isIphone = () => {
    return checkDevice('iphone');
}
export const isIpad = () => {
    return checkDevice('ipad');
}

export const isPc = () => {
    return !(isAndroid() || isIphone() || isIpad());
}

export const toDate = (time) => {
    let date = new Date(time * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
}
/**
 * 提取url中的域名
 * @param url
 * @returns {*}
 */
export const parseDomain = (url) => {
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
 * 滑动元素
 * @param distance 滑动距离
 * @param callback 回调 参数：移动距离
 */
export const drag = (distance = 0, callback) => {
    return (e) => {
        if (typeof distance !== 'number' && typeof distance !== 'string') {
            throw 'param type error';
        }
        let target = e.currentTarget,
            moveDistance = distance - target.offsetWidth,//减掉游标自身宽度
            clientX = e.clientX || e.targetTouches[0].clientX; //移动起点
        const onMouseMove = (moveE) => {
                let left = parseInt(target.style.left) || 0,
                    offset = (moveE.clientX || moveE.targetTouches[0].clientX) - clientX,
                    move = left + offset;
                //以当前点为起点再次开始移动，以此类推，形成了移动
                clientX = offset + clientX;
                //限制移动距离
                if (move >= moveDistance ) {
                    move = moveDistance;
                } else if (move < 0) {
                    move = 0;
                }

                // if (Math.abs(move) >= moveDistance && offset <= 0 || (left >= 0 && offset > 0)) {
                //     return;
                // }
                target.style.left = move + 'px';

                callback && callback(move / moveDistance * 100);
            },
            onMouseUp = () => {
                if (isPc()) {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                } else {
                    document.removeEventListener('touchmove', onMouseMove);
                    document.removeEventListener('touchend', onMouseUp);
                }
            };
        if (isPc()) {
            document.addEventListener('mousemove', onMouseMove, false);
            document.addEventListener('mouseup', onMouseUp);
        } else {
            document.addEventListener('touchmove', onMouseMove, false);
            document.addEventListener('touchend', onMouseUp);
        }
    }
};
/**
 * 获取随机数
 * @param max
 * @param min
 * @returns {*}
 */
export const getRandom = (max, min) => {
    if (typeof max !== 'number' || typeof min !== 'number') {
        throw 'param type need number'
    }
    return Math.random() * (max - min) + min;
};
/**
 * 判断元素高度是否大于屏幕高度
 * @param ele
 * @returns {boolean}
 */
export const isOverflowScreen = (ele) => {
    if (!ele || typeof ele !== 'object' || ele instanceof Array) {
        throw 'param type need object';
    }
    return ele.offsetHeight > window.innerHeight;
}
/**
 * 判断元素的边框是否在视口范围之内
 * @param element
 * @param border 边框
 * @param offset 偏移量
 * @returns {boolean}
 */
export const isBorderInViewPort = (element, border, offset = 0) => {
    if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
        throw 'first param type need an element'
    }
    if (typeof border !== 'string') {
        throw 'border need a string'
    }
    let rect = element.getBoundingClientRect();
    return window.innerHeight - offset >= rect[border] && rect[border] >= 0
}
/**
 * 判断边框在可视范围的位置
 * @param element
 * @param border
 * @param offset
 * @returns {*}
 */
export const whereBorderInViewPort = (element, border, offset = 0) => {
    if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
        throw 'first param type need an element'
    }
    if (typeof border !== 'string') {
        throw 'border need a string'
    }
    let rect = element.getBoundingClientRect();
    if (window.innerHeight - offset >= rect[border] && rect[border] >= 0) {
        return 'inner'
    } else if (rect[border] >= window.innerHeight - offset) {
        return 'down'
    } else {
        return 'up'
    }
}
/**
 * 判断元素是否在可视范围之内
 * @param element
 * @returns {boolean}
 */
export const isElementInViewPort = (element) => {
    if (typeof element !== 'object' || !(element instanceof HTMLElement)) {
        throw 'param need an element'
    }
    let rect = element.getBoundingClientRect();
    return (rect.top >= 0 && rect.top < window.innerHeight) ||
        (rect.bottom > 0 && rect.top <= 0)
}
/**
 * 判断目标元素是否在element 视图范围之内
 * @param element
 * @param target
 * @param offset
 * @returns {boolean}
 */
export const isTargetInElement = (element, target, offset) => {
    let targetRect = target.getBoundingClientRect(),
        relevantRect = element.getBoundingClientRect();
    if ((relevantRect.top === 0 && relevantRect.bottom === 0) ||
        targetRect.top === 0 && targetRect.bottom === 0) {
        return false
    }
    return relevantRect.top + offset.top <= targetRect.top && relevantRect.bottom + offset.bottom >= targetRect.bottom;
}
/**
 *根据目标元素的高度和偏移判断，当元素浮在可视区域内时，是否在相关元素区域内，relevant和target不属于包含关系
 * @param relevant
 * @param target
 * @param callBack
 * @param config pcMaxH pc中目标元素浮起时最大高度，phoneMaxH 手机,minH最小高度,bottomOffset 是相对于 relevant 底边的偏移向上为负数，向下为正数，topOffset相对顶边
 */
export const relativelyFloat = (relevant, target, callBack, config = {pcMaxH: 0, phoneMaxH: 0, minH: 0}) => {
    if (typeof relevant !== 'object' || !(relevant instanceof HTMLElement) ||
        typeof target !== 'object' || !(target instanceof HTMLElement)) {
        throw 'param need an element'
    }
    if (typeof callBack !== 'function') {
        throw 'callBack need a function type'
    }
    if (typeof config !== 'object' || (config instanceof Array)) {
        throw 'config need a object type'
    }
    let targetStyle = getComputedStyle(target),
        relevantStyle = getComputedStyle(relevant),
        targetMaxHeight = targetStyle.MaxHeight || isPc() ? config.pcMaxH : config.phoneMaxH,// 512是pc 评论浮层最大高度，312是手机的
        targetMinHeight = config.minH,
        bottom = parseInt(targetStyle.bottom) || 0,
        offset = target.offsetHeight + bottom + parseInt(relevantStyle.marginBottom) + parseInt(relevantStyle.marginTop);
    if (offset > targetMaxHeight && targetMaxHeight !== 0) {
        offset = parseInt(targetMaxHeight);
    } else if (offset < targetMinHeight) {
        offset = targetMinHeight;
    }
    //获取当前活动css  也可以使用getComputedStyle(this.contentNode).getPropertyValue('margin-bottom')

    if (isBorderInViewPort(relevant, 'bottom', config.bottomOffset || offset)) {
        callBack(false);
    } else if (!isBorderInViewPort(relevant, 'top', config.topOffset || offset) && whereBorderInViewPort(relevant, 'top', config.topOffset || offset) !== 'up') {
        callBack(false);
    } else if (isElementInViewPort(relevant)) {
        callBack(true);
    } else {
        callBack(false);
    }
}
/**
 * 给定相对于容器的某个left值计算出相对于body的left值，用于fixed元素
 * @param containerWidth
 * @param callBack
 * @param offset
 * @returns {function()}
 */
export const handleResize = (containerWidth = 0, callBack, offset = 0) => {
    if (typeof containerWidth !== 'number' && typeof containerWidth !== 'string') {
        throw 'containerWidth type need string or number'
    }
    if (typeof offset !== 'number' && typeof offset !== 'string') {
        throw 'offset type need string or number'
    }
    if (typeof callBack !== 'function') {
        throw 'callBack need a function type'
    }
    return () => {
        let eleWidth = parseInt(containerWidth),
            targetOffset = parseInt(offset),
            bodyWidth = document.getElementsByTagName('body')[0].clientWidth;
        if (bodyWidth <= eleWidth) {
            callBack(targetOffset);
            return;
        }
        callBack((bodyWidth - eleWidth) / 2 + targetOffset);
    }
}
/**
 * 根据参数 滚动到顶部，或是底部,或是相对当前位置的distance处
 * @param direction 方向默认'top'
 * @param distance 相对于当前位置要滚动的距离，不传默认滚动到顶点，或底部
 */
export const scrollTo = (direction = 'top', distance) => {
    let body = document.body, bodyScroll = body.scrollTop, dist = parseInt(distance);
    if (dist !== 0 && !!dist) {
        throw 'param distance need a number type';
    }
    if (direction === 'top') {
        body.scrollTop = !!dist ? bodyScroll - dist : 0;
    } else {
        body.scrollTop = !!dist ? bodyScroll + dist : body.offsetHeight;
    }
}
/**
 *
 * @param target
 * @param value
 * @returns {*|boolean}
 */
export const checkForm = (target, value) => {
    if (target === 'email') {
        let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        return value && reg.test(value)
    } else if (target === 'url') {
        let reg = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

        return value && reg.test(value)
    } else if (target === 'phone') {
        let reg = /^1[3|4|5|7|8]\d{9}$/;
        return value && reg.test(value)
    }

}
/**
 * 比较 目标的长度是否大于limit长度
 * @param target
 * @param limit
 * @returns {boolean}
 */
export const lengthMoreThan = (target, limit) => {
    if (typeof target !== 'string' && !target instanceof Array) {
        throw 'arg type need string or array'
    }

    return target.length > limit
}
/**
 * 检测value对象中的元素字符串长度是否大于给定的常量
 * @param value object like:
 * {
        name: ..,
        introduction: ...,
        homeUrl: ...,
        company: ...,
        career: ...,
    }
 * @param dispatch func
 * @param popMsg func
 * @param constant object 常量对象 可以是通过 import * as 形式产生
 * @param checker object like:
 * {
        name: {key: 'USER_NAME_LENGTH', popMsg: '昵称'},
        introduction: {key: 'USER_DESC_LENGTH', popMsg: '简介'},
        homeUrl: {key: 'USER_HOME_URL_LENGTH', popMsg: '主页'},
        company: {key: 'USER_COMPANY_LENGTH', popMsg: '公司'},
        career: {key: 'USER_CAREER_LENGTH', popMsg: '职业'},
    }
 USER_NAME_LENGTH 常量的名字
 * * @returns {boolean}
 */
export const checkStringLength = (value, dispatch, checker, constant, popMsg) => {
    if (!isObject(value)) {
        throw 'first arg need object'
    }
    if (!isObject(checker)) {
        throw 'third arg need object'
    }
    if (!isObject(constant)) {
        throw 'forth arg need object'
    }
    if (!isFunc(dispatch)) {
        throw 'second arg need func'
    }
    if (!isFunc(popMsg)) {
        throw 'fifth arg need func'
    }
    for (let key in value) {
        if (value.hasOwnProperty(key)) {
            if (lengthMoreThan(value[key], constant[checker[key].key])) {
                dispatch(popMsg(`${checker[key].popMsg}最大${constant[checker[key].key]}个字符`, false, 3000));
                return false
            }
        }
    }
    return true;
}