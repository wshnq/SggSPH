// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 引入路由配置信息
import routes from './routes'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
// 先把VueRouter原型对象的replace，先保存一份
let originReplace = VueRouter.prototype.replace

// 重写push|replace方法
// 第一个参数：跳转位置，第二个参数：成功回调，第三个参数：失败回调
VueRouter.prototype.push = function (location, resovle, reject) {
    if (resovle && reject) {
        // call与apply区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call参数用逗号隔开，apply用数组
        originPush.call(this, location, resovle, reject)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
export default new VueRouter({
    routes,
    // 滚动行为（y为0代表页面滚动到最顶上面）
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})