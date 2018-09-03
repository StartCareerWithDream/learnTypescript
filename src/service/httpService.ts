import Axios from 'axios';
import Utils from '../utils/Utils.js';

// ajax请求统一前缀
const loginUrl:String = '/login';
const configApi: String = 'http://privapp.qiyuesuo.net';
const viewToken: String = Utils.getUrlParam('viewToken');

Axios.interceptors.request.use(
    config => {
        config.url = configApi + config.url + (config.url.indexOf('?') > 0 ? '&' : '?') + `cb=${new Date().getTime()}`;
        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        // 嵌入式系统
        if(viewToken) {
            config.headers['X-OPENTOKEN'] = viewToken; 
        }
        
        config.withCredentials = true;
        return config;
    },
    err => {
        throw new Error(err);
    }
);

// response拦截
Axios.interceptors.response.use(
    function(response) {
        if (response.status === 200) {
            if (response.data.code === 403) {
                console.warn('会话失效，请重新登录！');

                let service = location.href;
                setTimeout(() => {
                    location.href = loginUrl + '?service=' + encodeURIComponent(service);
                }, 1000);
            }
        }
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

// 请求接口 => 请求本地json
function convertConfigUrl(url: string) {
    let mockUrl = 'http://localhost:8086/mock?name=';
    let fragmentList = url.split('/');
    fragmentList.shift();

    fragmentList.forEach((fragment, index) => {
        mockUrl += index == 0 ? fragment : fragment.substring(0, 1).toUpperCase() + fragment.substring(1);
    });

    return mockUrl;
}
export default Axios;
