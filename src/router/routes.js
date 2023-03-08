// 路由配置信息

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'

export default[
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
    {
        component:Detail,
        path:'/detail/:skuid',
        meta:{
            show:true
        }
    },
    // 重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]