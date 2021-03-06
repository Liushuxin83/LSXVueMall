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
        baseURL: 'http://123.207.32.32:8000/',
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