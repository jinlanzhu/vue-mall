import { request } from './request'

/**
 * 获取商品分类数据列表
 * @param {*} type 
 * @param {*} pagenum 
 * @param {*} pagesize 
 */
export function getGoodsCateList(type, pagenum, pagesize) {
  return request({
    method: 'get',
    url: '/categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

/**
 * 获取类型为2以上的数据列表
 * @param {*} type 
 */
export function getGoodsCateListByType(type) {
  return request({
    method: 'get',
    url: '/categories',
    params: {
      type: 2
    }
  })
}

/**
 * 添加分类
 * @param {*} cat_pid 
 * @param {*} cat_name 
 * @param {*} cat_level 
 */
export function getAddCate(cat_pid, cat_name, cat_level) {
  return request({
    method: 'post',
    url: '/categories',
    data: {
      cat_pid,
      cat_name,
      cat_level
    }
  })
}

/**
 * 根据 id 查询分类
 * @param {*} cat_id 
 */
export function getCateListByCatId(cat_id) {
  return request({
    method: 'get',
    url: '/categories/' + cat_id
  })
}

/**
 * 编辑提交分类
 * @param {*} cat_id 
 * @param {*} cat_name 
 */
export function getEditCateById(cat_id, cat_name) {
  return request({
    method: 'put',
    url: '/categories/' + cat_id,
    data: {
      cat_name
    }
  })
}

/**
 * 删除分类
 * @param {*} cat_id 
 */
export function getDeleteCate(cat_id) {
  return request({
    method: 'delete',
    url: '/categories/' + cat_id,
  })
}