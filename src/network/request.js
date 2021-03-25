import axios from 'axios'
// export function request(config, success, failure) {
//     // 1.创建axios的实例
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000/',
//         timeout: 5000,
//     });
//     //发送网络请求
//     instance(config).then(res => {
//         success(res);
//     }).catch(err => {
//         failure(err);
//     })
// }


export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5/',
        timeout: 10000,
    });

    //拦截器
    // Add a request interceptor
    instance.interceptors.request.use(function(config) {
        // Do something before request is sent
        // console.log(config);
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log(response);
        return response.data;
    }, function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });


    //发送网络请求
    return instance(config)
}

//封装登录注册接口
export function http(config) {
    const instance = axios.create({
            baseURL: "http://112.74.99.5:3000/web/api",
            timeout: 10000,
        })
        //拦截器
        // Add a request interceptor
    instance.interceptors.request.use(function(config) {
        // Do something before request is sent
        // console.log(config);
        if (localStorage.getItem('token')) {
					//设置请求头  登录和注册的数据请求不需要设置该请求头，只有在用户登录之后所要访问的数据才需要请求头
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        }
				// console.log(config);
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function(response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log(response);
        return response.data;
    }, function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
    //发送网络请求
    return instance(config)
}