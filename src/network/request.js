import axios from "axios"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://47.115.124.102:8888/api/private/v1',
    timeout: 5000
  })

  // 2. axios的拦截器
  // 2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    // 通过axios请求拦截器添加token,保证拥有获取数据的权限
    // 为请求头对象,添加token验证的Authorization字段
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {

  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    NProgress.done()
    return res.data
  }, err => {
    console.log(err);
  })

  // 3. 发送真正的网络请求
  return instance(config)
}