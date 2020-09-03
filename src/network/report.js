import { request } from './request'

/**
 * 基于时间统计的折线图
 */
export function getReportData() {
  return request({
    method: 'get',
    url: 'reports/type/1'
  })
}