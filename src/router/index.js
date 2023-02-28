// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
// 先把VueRouter原型对象的replace，先保存一份
let originReplace = VueRouter.prototype.replace

// 重写push|replace方法
// 第一个参数：跳转位置，第二个参数：成功回调，第三个参数：失败回调
VueRouter.prototype.push = function(location,resovle,reject){
    if(resovle && reject){
        // call与apply区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call参数用逗号隔开，apply用数组
        originPush.call(this,location,resovle,reject)
    }
    else{
        originPush.call(this.location,
            ()=>{

            },
            ()=>{

            })
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }
    else{
        originReplace.call(this.location,
            ()=>{

            },
            ()=>{
                
            })
    }
}


// 配置路由
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            // 在meta上用户可以自定义属性
            meta:{
                show:true
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            name:'search',
            // 如何指定params参数可传递可不传递，在配置路由的时候在占位符后面加个?
            path:'/search/:keyword?',
            component:Search,
            meta:{
                show:true
            }
            // 布尔值写法
            // 开启路由传参
            // 路由组件可以传递props并且是params参数
            // props:true

            // 对象写法
            // props:{
            //     keyword:1
            // }

            // 常用写法（函数写法）
            // props:($route)=>{
            //     return {
            //         keyword:$route.params.keyword,
            //         k:$route.query.k
            //     }
            // }
        },
        // 重定向，在项目跑起来的时候，访问/，立马定向到首页
        {
            path:'*',
            redirect:'/home'
        }
    ]
})