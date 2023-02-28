<template>
  <div id="app">
    <Header></Header>
    <!-- 放置路由组件 -->
    <router-view></router-view>
    <!-- 在Home、Search中Footer是显示的，在登录、注册中不显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 1.引入组件
// 写文件夹形式的，将来会自动寻找Header文件夹下的index
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发起请求，把数据存储到仓库中(获取商品分类三级列表的数据)
    this.$store.dispatch("categoryList");
  }
}
</script>

<style scoped>

</style>
