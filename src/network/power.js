import { request } from './request'

//权限


/**
 * 获取所有权限列表
 * @param {} type 
 */
export function getRightsList() {
  return request({
    url: '/rights/list',
  })
}