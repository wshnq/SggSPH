import { reqCartList, reqDeleteCartById, reqUpdateChekedByid } from '@/api'

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车某一物品
    async deleteCartListBySkuId({ commit }, skyId) {
        let result = await reqDeleteCartById(skyId)
        if (result.code == 200) {
            return 'ok'
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车选择状态
    async updateChekedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChekedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return new Promise.reject(new Error('faile'))
        }
    },
    // 删除所有勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context可以理解为一个小仓库
        // commit 提交mutations修改state    getters 计算属性    dispatch 派发action     state 当前仓库数据
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(e => {
            PromiseAll.push(e.isChecked == 1 ? dispatch('deleteCartListBySkuId', e.skuId) : '')
        })
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(e => {
            PromiseAll.push(dispatch('updateChekedById', { skuId: e.skuId, isChecked: isChecked }))
        })
        return Promise.all(PromiseAll)
    }

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}