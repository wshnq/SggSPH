// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入store
import store from '@/store'
// start:进度条开始 done:进度条结束
// 引入进度条的样式
import "nprogress/nprogress.css"

// 1.利用axios对象的方法create，创建一个axios实例
// 2.requests就是axios，只是稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径会出现api
    // bestURL:'/api',
    // 请求超时时间
    timeout:5000
})

// 请求拦截器：在请求之前，请求拦截器可以检测到，可以请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有个很重要的属性，headers请求头
    if(store.state.detail.uuid_token){
        // 给请求头添加字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    res=>{
        // 成功回调
        // 进度条结束
        nprogress.done()
        return res.data
    },
    error=>{
        // 失败回调
        return Promise.reject(new Error('faile'))
    }
)

// 对外暴露
export default requests