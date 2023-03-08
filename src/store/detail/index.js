// 引入商品详情的请求
import {reqGoodsInfo} from '@/api'
const state = {
    goodInfo:{}
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
}
const actions = {
    // 获取产品信息详情action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code==200){
            commit('GETGOODINFO',result.data)
        }
    }
}
const getters = {
    // 路径导航数据
    categoryView(state){
        // 返回的至少是个空对象
        return state.goodInfo.categoryView||{}
    },
    // 产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 产品的售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
