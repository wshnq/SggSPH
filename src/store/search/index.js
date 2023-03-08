import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({commit},params={}){
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性：在项目中为了简化数据而生
// 在项目中getters主要作用是：简化仓库中的数据
const getters = {
    // 当前形参state，是当前仓库的state，并非大仓库的state
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
