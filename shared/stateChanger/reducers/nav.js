/**
 * Created by tiankaiyuan on 2018/3/1.
 */
export default (state = {
    navList: [
        {text: '按钮', link: '/button'},
        {text: '列表', link: '/table'},
        {text: '导航', link: '/nav'},
        {text: '输入', link: '/input'},
        {text: '弹窗', link: '/alert'},
        {text: '加载', link: '/loading'}
    ],
    subNavList: [
        {text: '普通按钮', link: '/normal'},
        {text: '开关按钮', link: '/switch'}
    ]
}) => {
    return state
}