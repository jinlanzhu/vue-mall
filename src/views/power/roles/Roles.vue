<template>
  <div id="roles">
    <roles-nav />
    <roles-list
      :roles-list="rolesList"
      @removeRightsById="removeRightsById"
      @showAddRoleDialog="showAddRoleDialog"
      @showEditRoleDialog="showEditRoleDialog"
      @showDeleteRoleDialog="showDeleteRoleDialog"
      @showSetRolesDialog="showSetRolesDialog"
    />

    <!-- 添加角色对话框区域 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 主体区域 -->
      <role-add-form :add-role-form="addRoleForm" ref="addRoleFormRef" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色对话框区域 -->
    <el-dialog title="修改角色" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 主体区域 -->
      <role-edit-form :edit-role-form="editRoleForm" ref="editRoleFormRef" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除角色提示框 -->
    <!-- 分配角色对话框区域 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <!-- 主体区域 -->
      <!-- <role-add-form :add-role-form="addRoleForm" ref="addRoleFormRef" /> -->
      <set-rights-tree
        ref="setRightsRef"
        :rights-list="rightsList"
        :tree-props="treeProps"
        :def-keys="defKeys"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRolesBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesList,
  getRemoveRoleById,
  getAddRole,
  getRoleListById,
  getEditRole,
  getDeleteRole,
  getRightsListByTree,
  getSetRights
} from 'network/power.js'

import RolesNav from './childComps/RolesNav'
import RolesList from './childComps/RolesList'
import RoleAddForm from './childComps/RoleAddForm'
import RoleEditForm from './childComps/RoleEditForm'
import SetRightsTree from './childComps/SetRightsTree'

export default {
  data() {
    return {
      //角色列表
      rolesList: [],
      // 添加角色对话框显示
      addDialogVisible: false,
      //添加角色参数
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      //修改角色对象
      editRoleForm: {},
      editDialogVisible: false,
      setRoleDialogVisible: false,
      //树形权限列表
      rightsList: [],
      //树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //默认选中节点的id值
      defKeys: [],
      //角色id
      roleId: ''
    }
  },
  components: {
    RolesNav,
    RolesList,
    RoleAddForm,
    RoleEditForm,
    SetRightsTree
  },
  created() {
    this.getRolesList()
    this.getRightsListByTree()
    // this.getLeafKeys()
  },
  methods: {
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
        console.log(this.rolesList)
        // this.$message.success('获取角色列表成功！')
      })
    },
    /**
     * 通过角色id，权限id移除角色权限
     */
    async removeRightsById(role, rightId) {
      console.log(role)
      const confirmRresult = await this.$confirm(
        '此操作将移除该角色权限, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      console.log(confirmRresult)
      if (confirmRresult !== 'confirm') {
        return this.$message.info('已取消删除！')
      }

      //通过角色id，权限id移除角色权限操作
      getRemoveRoleById(role.id, rightId).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除角色失败！')
        }
        this.$message.success('删除角色成功！')
        role.children = res.data
      })
      //刷新角色列表

      // this.getRolesList()
    },
    /**
     * 添加角色
     */
    showAddRoleDialog() {
      this.addDialogVisible = true
    },
    //监听 对话框 关闭事件
    addDialogClosed() {
      this.$refs.addRoleFormRef.$refs.addRoleFormRef.resetFields()
    },
    /**
     * 点击确认按钮
     */
    addRoleBtn() {
      console.log('确定')
      this.$refs.addRoleFormRef.$refs.addRoleFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.getAddRole()
        this.addDialogVisible = false
        this.getRolesList()
      })
      // this.addDialogVisible = false
    },
    /**
     *添加角色
     */
    getAddRole() {
      getAddRole(this.addRoleForm.roleName, this.addRoleForm.roleDesc).then(
        res => {
          if (res.meta.status !== 201) {
            return this.$message.error('添加角色失败！')
          }
          this.$message.success('添加角色成功！')
        }
      )
    },
    //监听 对话框 关闭事件
    editDialogClosed() {
      this.$refs.editRoleFormRef.$refs.editRoleFormRef.resetFields()
    },
    /**
     * 修改角色
     */
    showEditRoleDialog(roleId) {
      console.log(roleId)
      this.editDialogVisible = true
      //获取根据角色id获取的角色信息
      getRoleListById(roleId).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取该角色列表信息失败！')
        }
        this.editRoleForm = res.data
        console.log(this.editRoleForm)
        this.$message.success('获取该角色列表信息成功！')
      })
    },
    /**
     * 点击编辑框确定按钮
     */
    editRoleBtn() {
      this.$refs.editRoleFormRef.$refs.editRoleFormRef.validate(valid => {
        if (!valid) {
          return
        }
      })
      this.editDialogVisible = false
      this.getEditRole()

      this.getRolesList()
    },
    /**
     * 获取根据编辑提交角色
     */
    getEditRole() {
      getEditRole(
        this.editRoleForm.roleId,
        this.editRoleForm.roleName,
        this.editRoleForm.roleDesc
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('修改角色失败！')
        }
        this.$message.success('修改角色成功！')
      })
    },
    /**
     * 获取删除的角色
     */
    getDeleteRole() {},
    async showDeleteRoleDialog(roleId) {
      console.log(roleId)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该角色, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消删除该角色！')
      }
      getDeleteRole(roleId).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('删除该角色失败！')
        }
        this.$message.success('删除该角色成功！')
        this.getRolesList()
      })
    },
    /**
     * 显示分配角色对话框
     */
    showSetRolesDialog(role) {
      console.log(role)
      this.roleId = role.id
      this.getRightsListByTree()
      //递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)
      this.setRoleDialogVisible = true
    },
    /**
     * 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
     */
    getLeafKeys(node, arr) {
      //如果当前node节点不包括children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },
    /**
     * 监听 关闭对话框 事件
     */
    setRoleDialogClosed() {
      //清空之前存储的id
      this.defKeys = []
      this.setRoleDialogVisible = false
    },
    /**
     * 获取属性权限列表
     */
    getRightsListByTree() {
      getRightsListByTree().then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.info('获取权限失败！')
        }
        this.rightsList = res.data
        console.log(this.rightsList)
      })
    },
    /**
     * 点击分配角色后的确定按钮
     */
    setRolesBtn(roleId) {
      //选中的id
      const strChecked = this.$refs.setRightsRef.$refs.setRightsRef.getCheckedKeys()
      //半选中的id
      const strHalf = this.$refs.setRightsRef.$refs.setRightsRef.getHalfCheckedKeys()
      const str = [...strChecked, ...strHalf]
      const strId = str.join(',')
      console.log(strId)
      console.log(this.roleId)
      getSetRights(this.roleId, strId).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('角色分配失败！')
        }
        this.getRolesList()
        this.setRoleDialogVisible = false
      })
    }
  }
}
</script>

<style scoped>
</style>
