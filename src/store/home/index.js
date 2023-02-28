import {reqCategoryList,reqGetbannerList} from '@/api'
// home模块的小仓库
const state = {
    // home仓库中存储三级菜单
    categoryList:[],
    // 轮播图
    bannerList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    }
}
const actions = {
    // 通过api里面的接口函数调用，向服务器发起请求，获取服务器数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图
    async getbannerList({commit}){
        let result = await reqGetbannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
