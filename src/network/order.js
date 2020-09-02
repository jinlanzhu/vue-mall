import { request } from './request'

/**
 * 订单数据列表
 * @param {*} query 
 * @param {*} pagenum 
 * @param {*} pagesize 
 */
export function getOrdersList(query, pagenum, pagesize) {
  return request({
    method: 'get',
    url: '/orders',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 查看物流信息
 * @param {*} id 
 */
export function getLogisticsList(id) {
  return request({
    method: 'get',
    url: '/kuaidi/' + id
  })
}
