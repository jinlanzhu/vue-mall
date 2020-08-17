import { request } from './request'


/**
 * 获取左侧菜单栏列表
 */
export function getMenusList() {
  return request({
    url: "/menus",
  })
}

/**
 * 获取用户列表信息
 * @param {*} query 
 * @param {*} pagenum 
 * @param {*} pagesize 
 */
export function getUsersList(query, pagenum, pagesize) {
  return request({
    url: '/users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 获取修改用户状态
 * @param {*} uId 
 * @param {*} type 
 */
export function getUserState(uId, type) {
  return request({
    method: 'put',
    url: 'users/' + uId + '/state/' + type
  })
}

/**
 * 添加用户
 * @param {*} username 
 * @param {*} password 
 * @param {*} email 
 * @param {*} mobile 
 */
export function getAddUser(username, password, email, mobile) {
  return request({
    method: 'post',
    url: '/users',
    data: {
      username,
      password,
      email,
      mobile
    }
  })
}

/**
 * 通过用户id查询用户
 * @param {*} id 
 */
export function getUserListById(id) {
  return request({
    url: 'users/' + id,

  })
}

/**
 * 编辑用户提交
 * @param {*} id 
 */
export function getEditUser(id, email, mobile) {
  return request({
    method: 'put',
    url: '/users/' + id,
    data: {
      email,
      mobile
    }
  })
}

/**
 * 根据id删除单个用户
 * @param {*} id 
 */
export function getDeleteUser(id) {
  return request({
    method: 'delete',
    url: '/users/' + id
  })
}

export function getRolesList() {
  return request({
    method: 'get',
    url: '/roles'
  })
}

/**
 * 分配用户角色
 * @param {*} id 用户id
 * @param {*} rid  角色id
 */
export function getSetRole(id, rid) {
  return request({
    method: 'put',
    url: '/users/' + id + '/role',
    data: {
      rid
    }
  })
}
