/**
 * Created by tiankaiyuan on 2018/3/8.
 */
import * as ActionTypes from '../actions/actionTypes'

export default (state = {
    count: 1,//正在显示的个数
    defaultMsg: {
        popMsg: '',
        showTime: 3000,
        needConfirm: false,
    },
    defaultItem: {
        '0': {
            data: '',
            index: 0
        },
        '1': {
            data: '',
            index: 0
        },
        '2': {
            data: '',
            index: 0
        },
        '3': {
            data: '',
            index: 0
        },
        '4': {
            data: '',
            index: 0
        },
    },
    data: []
}, action) => {
    switch (action.type) {

        case ActionTypes.POP_HIDDEN: {
            let defaultItem = state.defaultItem;
            defaultItem[action.id] = {
                index: defaultItem[action.id].index,
                data: ''
            };
            state.count -= 1;
            return {
                ...state,
                defaultItem: {
                    ...defaultItem
                }
            };
        }
        case ActionTypes.POP_MSG_CACHED : {
            let defaultItem = state.defaultItem,
                index = 0;
            defaultItem[action.id] = {
                index: index,
                data: state.data.shift()
            };
            state.count += 1;
            for (let key in defaultItem) {
                if (defaultItem.hasOwnProperty(key) && action.id !== key) {
                    if (defaultItem[key].data) {
                        defaultItem[key] = {
                            index: ++index,
                            data: defaultItem[key].data
                        };
                    }
                }
            }
            return {
                ...state,
                defaultItem: {
                    ...defaultItem
                }
            };
        }
        case ActionTypes.POP_MSG: {
            //每五个增加两秒展示时间
            let addTime = (state.count - 1) % 5 * 2000 || 0,
                defaultItem = state.defaultItem,
                index = 1,
                emptyItem = undefined;
            for (let key in defaultItem) {
                if (defaultItem.hasOwnProperty(key)) {
                    if (!defaultItem[key].data) {//倒着取item
                        emptyItem = key;
                        defaultItem[key].index = 0;
                    }
                }
            }
            if (emptyItem) {
                for (let key in defaultItem) {//顺序循环 越到后面index越大
                    if (defaultItem.hasOwnProperty(key) && key !== emptyItem) {
                        if (defaultItem[key].data) {
                            defaultItem[key] = {
                                index: index++,
                                data: defaultItem[key].data
                            };
                        }
                    }
                }
                return {
                    ...state,
                    defaultItem: {
                        ...state.defaultItem,
                        [emptyItem]: {
                            ...state.defaultItem[emptyItem],
                            data: {
                                popMsg: action.msg,
                                showTime: action.showTime + addTime,
                                needConfirm: !!action.needConfirm,
                            }
                        },
                    },
                    count: state.count + 1
                };
            }
            return {
                ...state,
                data: [
                    ...state.data,
                    {
                        popMsg: action.msg,
                        showTime: action.showTime,
                        needConfirm: !!action.needConfirm,
                    }
                ]
            };
        }
        default:
            return state;
    }
}