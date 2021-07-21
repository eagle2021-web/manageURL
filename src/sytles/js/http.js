import axios from "axios";
import qs from "qs"
// axios二次封装：就是把大部分接口公共的参数配置提取出来统一进行处理

/*
 * 项目开发的时候，是区分环境的「webpack」
 *   开发环境  开发
 *   测试环境  内测
 *  「灰度、拟态」
 *   生产环境  上线
 *   ...
 */
// process.env.NODE_ENV  基于webpack，设置的node环境变量  dev/test/pro
// 
let env = process.env.NODE_ENV;
// let env = "dev";
console.log(env);
switch (env) {
    case 'development':
        axios.defaults.baseURL = "http://localhost:6789";
        break;
    case 'production':
        axios.defaults.baseURL = "";
        break;
    case 'pro':
        axios.defaults.baseURL = "http://api.zhufeng.cn";
        break;
}

/*
 * 统一设置POST系列请求下，请求主体传递的信息「data」的格式化的
 *   不设置：
 *     如果data是一个纯粹对象，则会默认处理为json格式的字符串
 *     如果是一个formData对象，则默认就是按照formData处理
 *     如果是一个BASE64的值，则默认转换为BASE64字符串传递给服务器
 *     ...
 *   设置了：
 *     在发送给服务器之前，必须先经过transformRequest的处理，这样导致formData等特殊格式，可能无法和纯粹对象处理方案一致，此时需要我们进行判断处理  => 可以基于请求头信息进行判断「要求必须设置对应格式的请求头」
 */
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data, headers) {
    let ContentType = headers['Content-Type'] || headers.common['Content-Type'] || headers.post['Content-Type'] || 'application/json';

    if (ContentType === "application/json") {
        return JSON.stringify(data);
    }

    if (ContentType === "application/x-www-form-urlencoded") {
        return qs.stringify(data);
    }
    return data;
};
//
/*
 * 一些小零碎的配置
 *   timeout 超时
 *   withCredentials  CORS跨域（携带资源凭证）
 */
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status < 300;
}
//
//
/*
 * 请求拦截器：在所有配置项处理完，发送给服务器之前，做一下拦截
 *   例如：设置Token
 */
axios.interceptors.request.use(function (config) {
    let Token = localStorage.getItem('Token');
    if (Token) {
        config.headers['X-Token/Authorization'] = Token;
    }
    return config;
});

/*
 * 响应拦截器：服务器返回信息和我们自己业务层处理信息之间
 */
axios.interceptors.response.use(function (response) {

    // 把获取的响应主体信息返回
    return response.data || response;
}, function (reason) {
    // 失败：网络、状态码(Axios失败)
    let response = reason.response;
    if (response) {
        // 状态码不是2开头的
        switch (response.status) {
            //400 参数
            //401/403 Token
            //404 地址
            //500/503 服务器
        }
    } else {
        // 网络 / (超时 / 中断请求  -> code: "ECONNABORTED") ...
        if (reason && reason.code === "ECONNABORTED") {}
        if (!navigator.onLine) {}
    }
    return Promise.reject(reason);
});
//
//
// 业务层进一步封装：区分不同的业务 和 对业务层的失败做处理
function queryGET(url, config = {}) {
    return axios.get(url, config).then(data => {
        let code = +data.code;
        if (!isNaN(code) && code !== 200) return Promise.reject(data);
        return data;
    });
}

function queryFile(url, data, config = {}) {
    config = Object.assign(config, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return axios.post(url, data, config);
}

function queryPOST(url, data, config = {}) {
    config = Object.assign(config, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return axios.post(url, data, config);
}
export {
    queryPOST,
    queryGET,
    queryFile
}