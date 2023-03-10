import {v4 as uuidv4} from 'uuid'
// 生成一个随机的字符串，每次执行不能发生变化，游客身份持久注册
export const getUUID = ()=>{
    // 先从本地存储获取uuid，看一下是否存在
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有则生成
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}