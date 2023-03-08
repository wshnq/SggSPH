// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// start:进度条开始 done:进度条结束
// 引入进度条的样式
import "nprogress/nprogress.css"

const requests = axios.create({
    bestURL:'/mock',
    // 请求超时时间
    timeout:5000
})

// 请求拦截器：在请求之前，请求拦截器可以检测到，可以请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有个很重要的属性，headers请求头
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res)=>{
        // 成功回调
        // 进度条结束
        nprogress.done()
        return res.data
    },
    (error)=>{
        // 失败回调
        return Promise.reject(new Error('faile'))
    }
)

// 对外暴露
export default requests