/**
 * Created by tiankaiyuan on 2017/8/2.
 */
let port = 8989,
    hostname = 'localhost',
    protocol = 'http:';
if (process.env.NODE_ENV === 'production') {
    port = 443;
    protocol = 'https:';
}

if (process.env.BROWSER) {
    hostname = location.hostname;
    protocol = location.protocol;
}
let url = protocol + '//' + hostname + ':' + port + '/api/';

let apis = {
    git: 'https://api.github.com/search/repositories'
   /*INSERT_API*/
};
export default apis