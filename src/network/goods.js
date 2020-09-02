import { request } from './request'

/**
 * 获取商品列表数据
 * @param {*} query 
 * @param {*} pagenum 
 * @param {*} pagesize 
 */
export function getGoodsList(query, pagenum, pagesize) {
  return request({
    method: 'get',
    url: '/goods',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 删除商品
 * @param {*} goods_id 
 */
export function getDeleteGoods(goods_id) {
  return request({
    method: 'delete',
    url: '/goods/' + goods_id
  })
}

/**
 * 获取商品分类列表
 */
export function getGoodsCateList() {
  return request({
    method: 'get',
    url: '/categories'
  })
}

/**
 * 静态参数列表
 * @param {*} cat_id 
 * @param {*} sel 
 */
export function getGoodsManyParamsList(cat_id, sel) {
  return request({
    method: 'get',
    url: '/categories/' + cat_id + '/attributes',
    params: {
      sel: 'many'
    }
  })
}

/**
 * 动态参数列表
 * @param {*} cat_id 
 * @param {*} sel 
 */
export function getGoodsOnlyParamsList(cat_id, sel) {
  return request({
    method: 'get',
    url: '/categories/' + cat_id + '/attributes',
    params: {
      sel: 'only'
    }
  })
}

/**
 * 添加商品
 */
export function getAddGoods(goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs) {
  return request({
    method: 'post',
    url: '/goods',
    data: {
      goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs
    }
  })
}
