<template>
  <div>
    <el-card class="box-card">
      <!-- 添加角色 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addRoleBtn">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表 -->
      <el-row>
        <el-col>
          <el-table stripe :data="rolesList" border style="width: 100%">
            <el-table-column width="50px" type="expand">
              <template slot-scope="scope">
                <el-row
                  :class="['bdBottom', index1 === 0 ? 'bdTop' : '', 'vcenter']"
                  v-for="(item1, index1) in scope.row.children"
                  :key="item1.id"
                >
                  <!-- 一级权限 -->
                  <el-col :span="5">
                    <el-tag
                      closable
                      @close="removeRightsById(scope.row, item1.id)"
                    >{{item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 二三级权限 -->
                  <el-col :span="19">
                    <el-row
                      :class="[index2 === item1.children.length-1 ? '' : 'bdBottom', 'vcenter']"
                      v-for="(item2, index2) in item1.children"
                      :key="item2.id"
                    >
                      <!-- 二级权限 -->
                      <el-col :span="5">
                        <el-tag
                          closable
                          type="success"
                          @close="removeRightsById(scope.row, item2.id)"
                        >{{item2.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                      </el-col>
                      <!-- 三级权限 -->
                      <el-col :span="19">
                        <el-tag
                          closable
                          v-for="item3 in item2.children"
                          :key="item3.id"
                          type="warning"
                          @close="removeRightsById(scope.row, item3.id)"
                        >{{item3.authName}}</el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="50px"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="editRoleBtn(scope.row.id)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteRoleBtn(scope.row.id)"
                >删除</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-setting"
                  @click="setRolesBtn(scope.row)"
                >分配角色</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    rolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {},
  methods: {
    /**
     * 移除角色权限
     */
    removeRightsById(role, rightId) {
      this.$emit('removeRightsById', role, rightId)
    },
    /**
     * 添加角色按钮
     */
    addRoleBtn() {
      this.$emit('showAddRoleDialog')
    },
    editRoleBtn(roleId) {
      this.$emit('showEditRoleDialog', roleId)
    },
    /**
     * 删除角色按钮
     */
    deleteRoleBtn(roleId) {
      this.$emit('showDeleteRoleDialog', roleId)
    },
    /**
    分配角色按钮 */
    setRolesBtn(role) {
      console.log(role)
      this.$emit('showSetRolesDialog', role)
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdTop {
  border-top: 1px solid #eee;
}
.bdBottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
