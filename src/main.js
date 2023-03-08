import Vue from 'vue'
import App from './App.vue'

// 全局组件(三级联动组件)
import TypeNav from '@/components/TypeNav'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
// 注册全局轮播组件
import Carousel from '@/components/Carousel'
// 注册全局组件分页器
import Pagination from "@/components/Pagination"
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 引入路由
import router from '@/router'
// 引入vuex仓库
import store from '@/store'
// 引入mockServe.js
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置 
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  // 注册路由(简写形式key与value一致)
  router,
  // 注册仓库:组件的实例对象上多一个$store属性
  store
}).$mount('#app')
