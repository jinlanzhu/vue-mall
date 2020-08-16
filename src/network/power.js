import { request } from './request'

//权限


/**
 * 获取所有权限列表
 */
export function getRightsList() {
  return request({
    url: '/rights/list',
  })
}

export function getRightsListByTree() {
  return request({
    method: 'get',
    url: '/rights/tree'
  })
}


/**
 * 获取用户角色列表
 */
export function getRolesList() {
  return request({
    method: 'get',
    url: '/roles'
  })
}

/**
 * 添加角色
 * @param {*} roleName 
 * @param {*} roleDesc 
 */
export function getAddRole(roleName, roleDesc) {
  return request({
    method: 'post',
    url: '/roles',
    data: {
      roleName,
      roleDesc
    }
  })
}

/**
 * 根据 ID 查询角色
 * @param {*} roleId 
 */
export function getRoleListById(roleId) {
  return request({
    method: 'get',
    url: '/roles/' + roleId
  })
}

/**
 * 编辑提交角色
 * @param {*} roleId 
 * @param {*} roleName 
 * @param {*} roleDesc 
 */
export function getEditRole(roleId, roleName, roleDesc) {
  return request({
    method: 'put',
    url: '/roles/' + roleId,
    data: {
      roleName,
      roleDesc
    }
  })
}

/**
 *  删除角色
 * @param {*} roleId 
 */
export function getDeleteRole(roleId) {
  return request({
    method: 'delete',
    url: '/roles/' + roleId
  })
}

/**
 * 删除角色指定权限
 * @param {*} roleId 
 * @param {*} rightId 
 */
export function getRemoveRoleById(roleId, rightId) {
  return request({
    method: 'delete',
    url: 'roles/' + roleId + '/rights/' + rightId
  })
}

/**
 * 角色授权
 * @param {*} roleId 
 * @param {*} rids 
 */
export function getSetRights(roleId, rids) {
  return request({
    method: 'post',
    url: '/roles/' + roleId + '/rights',
    data: {
      rids
    }
  })
}