<template>
  <div>
    <!-- 面包屑导航 -->
    <users-nav></users-nav>

    <users-list
      :users-list="usersList"
      :total="total"
      @handlePageSize="handlePageSize"
      @handleCurrentPage="handleCurrentPage"
      @changeUsersState="changeUsersState"
      @userSearch="userSearch"
      @clearSearchList="clearSearchList"
      @showAddUserDialog="showAddUserDialog"
      @showEditUserDialog="showEditUserDialog"
      @showDeleteUserBox="showDeleteUserBox"
      @showSetRoleDialog="showSetRoleDialog"
    />

    <!-- 添加用户区域 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 主体区域 -->
      <user-add-form :add-form="addForm" ref="addFormRef" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户区域 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <user-edit-form :edit-form="editForm" ref="editFormRef"></user-edit-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除区域 -->
    <!-- 分配角色区域 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <!-- <user-edit-form  ref="setRoleFormRef"></user-edit-form> -->
      <!-- <user-set-role
        ref="setRoleRef"
        :user-info="userInfo"
        :roles-list="rolesList"
        :select-role-id="selectRoleId"
      />-->
      <div>
        <p>当前用户：{{ userInfo.username}}</p>
        <p>当前角色：{{userInfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select
            ref="setRoleRef"
            v-model="selectRoleId"
            default-first-option
            placeholder="请选择文章标签"
          >
            <el-option
              v-for="item in rolesList"
              :value="item.id"
              :label="item.roleName"
              :key="item.value"
            ></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsersList,
  getUserState,
  getAddUser,
  getUserListById,
  getEditUser,
  getDeleteUser,
  getRolesList,
  getSetRole
} from 'network/home.js'

import UsersNav from './childComps/UsersNav'
import UsersList from './childComps/UsersList'
import UserAddForm from './childComps/UserAddForm'
import UserEditForm from './childComps/UserEditForm'
import UserSetRole from './childComps/UserSetRole'

export default {
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        //搜索的内容
        query: '',
        // 当前页数
        pagenum: 1,
        // 一页的条数
        pagesize: 2
      },
      usersList: [],
      total: 0,
      // 是否显示添加用户的对话框
      addDialogVisible: false,
      //添加用户的参数
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 是否显示编辑用户的对话框
      editDialogVisible: false,
      //获取通过id查询的信息
      editForm: {},
      setRoleDialogVisible: false,
      //用户信息
      userInfo: {},
      //角色列表
      rolesList: [],
      selectRoleId: ''
    }
  },
  components: {
    UsersNav,
    UsersList,
    UserAddForm,
    UserEditForm,
    UserSetRole
  },
  created() {
    this.getUsersList()
  },
  methods: {
    /**
     * 获取用户列表
     */
    getUsersList() {
      getUsersList(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message({
            type: 'error',
            message: '获取管理员列表失败'
          })
        }
        this.usersList = res.data.users
        this.total = res.data.total
      })
    },
    handlePageSize(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    handleCurrentPage(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUsersList()
    },
    /**
     * 改变用户的状态
     */
    changeUsersState(userInfo) {
      getUserState(userInfo.id, userInfo.mg_state).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          this.$message({
            type: 'error',
            message: '设置状态失败！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '设置状态成功！'
          })
        }
      })
    },
    // 搜索查询
    userSearch(query) {
      this.queryInfo.query = query
      this.getUsersList()
    },
    // 清除搜索的内容重新置换原来的列表
    clearSearchList() {
      this.queryInfo.query = ''
      this.getUsersList()
    },
    //显示添加用户dialog
    showAddUserDialog() {
      this.addDialogVisible = true
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      console.log(this.$refs.addFormRef.$refs.addFormRef)
      this.$refs.addFormRef.$refs.addFormRef.resetFields()
    },
    //监听 确定按钮 添加用户
    addUserBtn() {
      this.$refs.addFormRef.$refs.addFormRef.validate(valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        this.addDialogVisible = false
        this.getUsersList()
        this.getAddUser()
      })
    },
    getAddUser() {
      console.log(this.addForm.username)
      getAddUser(
        this.addForm.username,
        this.addForm.password,
        this.addForm.email,
        this.addForm.mobile
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message({
            type: 'error',
            message: '添加用户失败！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '添加用户成功！'
          })
        }
      })
    },
    // 监听 编辑用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.$refs.editFormRef.resetFields()
    },
    /**
     * 显示编辑用户信息对话框
     * 通过id获取编辑该用户的信息展示在form中
     */
    showEditUserDialog(id) {
      console.log(id)
      this.editDialogVisible = true
      getUserListById(id).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message({
            type: 'error',
            message: '获取用户信息失败！'
          })
        }
        this.$message({
          type: 'success',
          message: '获取用户信息成功！'
        })
        this.editForm = res.data
        console.log(this.editForm)
      })
    },
    /**
     * 通过id获取编辑该用户的信息
     */
    getUserListById(id) {},
    /**
     * 编辑用户按钮
     */
    editUserBtn() {
      this.$refs.editFormRef.$refs.editFormRef.validate(valid => {
        if (!valid) {
          return
        }
      })
      this.editDialogVisible = false
      this.getEditUser()
      //刷新用户列表
      this.getUsersList()
    },
    /**
     * 获取编辑用户的状态信息
     */
    getEditUser() {
      getEditUser(
        this.editForm.id,
        this.editForm.email,
        this.editForm.mobile
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message({
            type: 'error',
            message: '更新失败！'
          })
        }
        this.$message({
          type: 'success',
          message: '更新成功！'
        })
      })
    },
    async showDeleteUserBox(id) {
      console.log(id)
      // getDeleteUser(id).then(res => {
      //   console.log(res)
      //   // if(res.meta.status )
      // })
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      }
      getDeleteUser(id).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败!')
        }
        this.$message.success('删除成功！')
      })
      this.getUsersList()
    },
    showSetRoleDialog(role) {
      console.log(role)
      this.userInfo = role
      console.log(this.userInfo)
      this.getRolesList()
      this.setRoleDialogVisible = true
    },
    setRoleDialogClosed() {
      this.setRoleDialogVisible = false
      this.selectRoleId = ''
      this.userInfo = []
      // this.$refs.setRoleRef.$refs.setRoleRef.resetFields()
    },
    /**
     * 获取角色列表
     */
    getRolesList() {
      getRolesList().then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取角色列表失败！')
        }
        this.rolesList = res.data
      })
    },
    /**
     * 分配角色确定按钮
     */
    setRoleBtn() {
      if (!this.selectRoleId) {
        return this.$message.error('请选择要分配的角色名称！')
      }
      console.log(this.selectRoleId)
      console.log(this.userInfo)
      this.getSetRole()
      this.getUsersList()
      this.setRoleDialogVisible = false
    },
    getSetRole() {
      getSetRole(this.userInfo.id, this.selectRoleId).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('更新角色失败！')
        }
        this.$message.success('更新角色成功！')
      })
    }
  }
}
</script>

<style scoped>
</style>
