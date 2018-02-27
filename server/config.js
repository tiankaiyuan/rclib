/**
 * Created by tiankaiyuan on 2018/2/27.
 */
let config = {
    port: 8000
};
if (process.env.NODE_ENV == 'production') {
    config.port = 80;
}
export default config;