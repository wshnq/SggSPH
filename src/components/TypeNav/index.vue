<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseleave="leaveShow" @mouseenter="enterShow">
        全部商品分类
      </h2>
      <!-- 三级联动 -->
      <!-- 过渡动画 -->
      <transition name="sort">
        <div
          class="sort"
          v-show="show"
          @mouseleave="leaveShow"
          @mouseenter="enterShow"
        >
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
              @mouseenter="changeIndex(index)"
              @mouseleave="leaveIndex"
            >
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二级、三级 -->
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入方式：是把lodash全部功能函数引入
// import _ from 'lodash'
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // throttle回调函数别用箭头函数，可能出现上下文this问题
    changeIndex: throttle(function (index) {
      // 正常情况，鼠标进入每一个h3都会触发鼠标进入事件
      // 不正常情况（用户操作很快）经过测试，只有部分h3被触发
      // 由于用户的行为过快，浏览器反应不过来。如果当前的回调函数里面有大量的业务，可能会出现卡顿现象
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -1;
    },
    // 进行路由跳转
    goSearch(event) {
      // 最好的解决方案：编程式导航+事件委派
      // 存在一些问题： 事件委派，是把全部的子节点【h3,dt,dl,em】的事件委派给父亲节点
      // 点击a标签的时候进行路由跳转
      // 第一个问题：把子节点中的a标签，加上一个自定属性data-categoryName,其余子节点没有
      let element = event.target;
      // 获取到当前的事件节点
      // 节点中有个方法dataset属性可以获取节点的自定义属性
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签上拥有categoryName属性那就一定是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候，带着params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理参数
          location.query = query;
          // 路由跳转
          console.log(location);
          // debugger
          this.$router.push(location);
        }
      }
    },
    // 当鼠标移入的时候，让商品分类进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    leaveShow() {
      if (this.$route.path != "/home") {
        this.show = false;
        this.currentIndex = -1;
      }
    },
  },
  // 组件挂载完毕可以向服务器发起请求
  mounted() {
    // 当组件挂载成功，让show属性值变成false
    // 判断路由
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      // 会注入一个参数state，state其实就是大仓库的数据
      categoryList: state => state.home.categoryList
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        // &:hover {
        //   .item-list {
        //     display: block;
        //   }
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画的开始状态（过渡动画进入的开始状态）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的事件、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>