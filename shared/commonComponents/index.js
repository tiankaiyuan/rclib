/**
 * Created by tiankaiyuan on 2018/3/3.
 */
import InputPassword from './InputPassword'
const addInfo = (config, info, component) => {
    if (typeof config !== 'object' || typeof info !== 'object') {
        throw 'addInfo need param is object type !'
    }
    if (!config[info.category].subNavList) {
        config[info.category].subNavList = {}
    }
    config[info.category].subNavList[info.id] = {
        text: info.name,
        id: info.id,
        Component: component
    };
    return config;
};
let config = {
    button: {
        text: '按钮',
        link: '/components/button/',
        title: 'react 构建按钮组件',
        description: '高可复用的按钮组件',
        subNavList: {
            normal1: {text: '普通按钮', id: 'normal1'},
            'switch': {text: '开关按钮', id: 'switch'}
        }

    },
    table: {
        text: '列表',
        link: '/components/table/',
        title: 'react 构建列表组件',
        description: '高可复用的列表组件',
        subNavList: {
            normal2: {text: '普通列表', id: 'normal2'},
            dynamic: {text: '动态列表', id: 'dynamic'}
        }
    },
    nav: {
        text: '导航',
        link: '/components/nav/'
    },
    input: {
        text: '输入',
        link: '/components/input/',
        title: 'react 构建输入组件',
        description: '高可复用的输入组件',
        subNavList: {
            normal3: {text: '普通列表', id: 'normal3'},
            dynamic4: {text: '动态列表', id: 'dynamic4'}
        }
    },
    alert: {
        text: '弹窗',
        link: '/components/alert/'
    },
    loading: {
        text: '加载',
        link: '/components/loading/'
    }
};
addInfo(config,InputPassword.idCard,InputPassword.InputPassword);

export default config