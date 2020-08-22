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

/**
 * 动态获取分类参数
 * @param {*} cat_id 
 * @param {*} sel many:动态参数  only:静态属性
 */
export function getParamsList(cat_id, sel) {
  return request({
    method: 'get',
    url: '/categories/' + cat_id + '/attributes',
    params: {
      sel
    }
  })
}

/**
 * 添加动态参数或者静态属性
 * @param {*} cat_id 
 * @param {*} attr_sel 
 */
export function getAddParams(cat_id, attr_name, attr_sel) {
  return request({
    method: 'post',
    url: '/categories/' + cat_id + '/attributes',
    data: {
      attr_name,
      attr_sel,

    }
  })
}

/**
 * 根据 ID 查询参数
 * @param {*} cat_id 
 * @param {*} attrId 
 * @param {*} attr_sel 
 */
export function getParamsListByid(cat_id, attrId, attr_sel) {
  return request({
    method: 'get',
    url: 'categories/' + cat_id + '/attributes/' + attrId,
    data: {
      attr_sel
    }
  })
}

/**
 * 编辑提交参数
 * @param {*} cat_id 
 * @param {*} attrId 
 * @param {*} attr_name 
 * @param {*} attr_sel 
 */
export function getEditParams(cat_id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    method: 'put',
    url: 'categories/' + cat_id + '/attributes/' + attrId,
    data: {
      attr_sel,
      attr_name,
      attr_vals
    }
  })
}

/**
 * 删除参数
 * @param {*} cat_id 
 * @param {*} attrId 
 */
export function getDeleteParams(cat_id, attrId) {
  return request({
    method: 'delete',
    url: 'categories/' + cat_id + '/attributes/' + attrId,
  })
}

/**
 * 获取类型为3以上的数据列表
 * @param {*} type 
 */
export function getGoodsCateListByTypeToThree() {
  return request({
    method: 'get',
    url: '/categories',
  })
}

