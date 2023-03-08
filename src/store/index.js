import Vue from "vue"
// Vuex是个对象
import Vuex from "vuex"
// 需要使用一次插件
Vue.use(Vuex)
// state:仓库存储数据的地方
// mutations:修改state的唯一手段
// action:处理action的地方，可以书写自己的业务逻辑，也可以处理异步
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

// 引入小仓库
import home from "./home"
import search from "./search"
import detail from "./detail"
// 对外暴露store类的实例
export default new Vuex.Store({
   modules:{
      home,
      search,
      detail
   }
})