import axios from 'axios'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const service = axios.create({
    baseURL: "/mock",
    //一般写什么?
    //接口文档每个接口路径的公共部分
    //如果没有公共部分,造一个
    timeout: 50000,
});

// 拦截器
// 拦截报文
// 拦截器我们一般就做两件事  添加功能和修改报文
// 添加请求拦截器
service.interceptors.request.use((config) => {
    // config代表调用axios的配置对象
    // axios配置对象解析变为报文的一部分
    // 拦截配置对象的就是拦截报文

    //四\ 添加进度条信息  nprogress
    NProgress.start();
    return config; //报文必须返回
});

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        // 二\返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
        NProgress.done();
        return response.data;
    },
    (error) => {
        // 三统一处理请求错误, 具体请求也可以选择处理或不处理
        // 统一处理错误,后面可以选择继续处理,也可以选择不处理

        alert("发送mockRequest请求失败");

        // return new Promise(() => {})
        //pending状态promise,中断promise链
        // 后期我们调用axios函数返回的promise就不再去处理错误了
        NProgress.done();
        return Promise.reject(error);
    }
);

export default service;