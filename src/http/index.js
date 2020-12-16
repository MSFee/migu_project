import axios from 'axios';

const service = axios.create({
    baseURL: 'http://106.75.147.83:3000/', // 基础URL
    withCredentials: true,
    timeout: 30000, // 请求超时
})

// get请求
function get(config = {}) {
    return config;
}
// post请求
function post(config = {}) {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    return config;
}

// 请求拦截器
service.interceptors.request.use(
    config => {
        switch(config.method.toUpperCase()) {
            case 'GET':
                return get(config);
            case 'POST':
                return post(config);
            default:
                return config;
        }
    },
    error => {
        return Promise.reject(error) ;// 请求失败
    }
)
// 处理相应拦截器
service.interceptors.response.use(
    response => {
        let tmp = response.data;
        if(tmp.code === 200) {
            return Promise.resolve(tmp.result ?? tmp.data ?? tmp.monthData ?? tmp.products ?? tmp.playlist ?? tmp.artists)
        }else {
            return Promise.reject(tmp);
        }
    },error => {
        return Promise.reject(error);
    }
)

export default service;