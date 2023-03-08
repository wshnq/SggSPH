import {reqCategoryList,reqGetbannerList,reqFloorList} from '@/api'
// home模块的小仓库
const state = {
    // home仓库中存储三级菜单
    categoryList:[],
    // 轮播图
    bannerList:[],
    // floor数据
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
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
    },
    // 获取floor数据
    async getfloorList({commit}){
        let result = await reqFloorList();
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
// 计算属性
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
