// 当前的这个模块：API进行统一的管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动
// /api/product/getBaseCategoryList
// 发请求

export const reqCategoryList = ()=>requests({
    url:'/api/product/getBaseCategoryList',
    method:'GET'
})

// 获取banner轮播图
export const reqGetbannerList = ()=>mockRequests({
    url:'/mock/banner',
    method:'GET'
})

// 获取floor数据
export const reqFloorList = ()=>mockRequests({
    url:'/mock/floor',
    method:'GET'
})

//  获取搜索模块数据
export const reqGetSearchInfo = (params)=>requests({
    url:'/api/list',
    method:'POST',
    data:params
})

// 获取商品详情的数据
export const reqGoodsInfo = (skuId)=>requests({
    url:'/api/item/'+skuId,
    method:'GET'
})

// 将产品添加到购物车(或者更新某一产品的数量)
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({
    url:`/api/cart/addToCart/${skuId}/${skuNum}`,
    method:'POST'
})

// 获取购物车列表接口
export const reqCartList = ()=>requests({
    url:'/api/cart/cartList',
    method:'GET'
})

// 删除购物车物品
export const reqDeleteCartById = (skuId)=>requests({
    url:'/api/cart/deleteCart/'+skuId,
    method:'DELETE'
})

// 切换商品选择状态
export const reqUpdateChekedByid = (skuId,isChecked)=>requests({
    url:`/api/cart/checkCart/${skuId}/${isChecked}`,
    method:'GET'
})