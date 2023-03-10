// 引入商品详情的请求
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装临时游客的模块的uuid
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息详情action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中,或修改数据
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return result
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    // 路径导航数据
    categoryView(state) {
        // 返回的至少是个空对象
        return state.goodInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品的售卖属性
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
