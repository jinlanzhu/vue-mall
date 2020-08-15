<template>
  <div>
    <el-card class="box-card">
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" v-model="input" clearable @clear="clearSearchList">
            <el-button slot="append" icon="el-icon-search" @click="userSearchBtn(input)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户信息列表 -->
      <el-row>
        <el-col>
          <el-table :data="usersList" border>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="role_name" label="角色"></el-table-column>
            <el-table-column label="状态">
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change="changeUsersState(scope.row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="editUserBtn(scope.row.id)"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  @click="deleteUserBtn(scope.row.id)"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                ></el-button>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
                  <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 分页区域 -->
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  props: {
    usersList: {
      type: Array,
      default() {
        return []
      }
    },
    total: Number
  },
  components: {},
  methods: {
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.$emit('handlePageSize', newSize)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.$emit('handleCurrentPage', newPage)
    },
    //监听 switch 状态改变的事件
    changeUsersState(userInfo) {
      console.log(userInfo)
      this.$emit('changeUsersState', userInfo)
    },
    //搜索按钮
    userSearchBtn(input) {
      this.input = input
      console.log(this.input)
      this.$emit('userSearch', input)
    },
    clearSearchList() {
      this.$emit('clearSearchList')
    },
    // userSearchEnter(input) {
    //   console.log(input)
    // }
    addUser() {
      this.$emit('showAddUserDialog')
    },
    editUserBtn(id) {
      this.$emit('showEditUserDialog', id)
    },
    deleteUserBtn(id) {
      this.$emit('showDeleteUserBox', id)
    }
  }
}
</script>

<style scoped>
</style>
