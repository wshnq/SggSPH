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
export const reqGetbannerList = ()=>mockRequests.get('/banner')