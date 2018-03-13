/**
 * Created by tiankaiyuan on 2018/3/8.
 */
let config = {
    port: 8989
};
if (process.env.NODE_ENV == 'production') {
    config.port = 447;
}
export default config;