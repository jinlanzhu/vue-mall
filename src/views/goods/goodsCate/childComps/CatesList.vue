<template>
  <div>
    <el-card class="box-card">
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateBtn">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 分类列表 -->
      <el-row>
        <el-col>
          <tree-table
            class="treeTable"
            :data="catesList"
            :columns="columns"
            :selection-type="false"
            show-index
            index-text="#"
            :expand-type="false"
            border
          >
            <!-- 是否有效 -->
            <template slot="isOk" slot-scope="scope">
              <i
                class="el-icon-success"
                style="color: lightgreen"
                v-if="scope.row.cat_deleted === false"
              ></i>
              <i class="el-icon-error" style="color: red" v-else></i>
            </template>

            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
              <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
              <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
              <el-tag size="mini" type="warning" v-else>三级</el-tag>
            </template>

            <!-- 操作 -->
            <template slot="opt" slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="editCateBtn(scope.row.cat_id)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="deleteCateBtn(scope.row.cat_id)"
              >删除</el-button>
            </template>
          </tree-table>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 7, 10, 15]"
            :page-size="queryCateInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import TreeGrid from 'components/common/treeGrid/TreeGrid.vue'
export default {
  data() {
    return {
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // prop: 'cat_deleted'
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ]
    }
  },
  props: {
    catesList: {
      type: Array,
      default() {
        return []
      }
    },
    queryCateInfo: {
      type: '',
      // 当前页码值
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 5
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
    //添加分类按钮
    addCateBtn() {
      this.$emit('showAddCateDialog')
    },
    //修改分类按钮
    editCateBtn(cat_id) {
      this.$emit('showEditCateDialog', cat_id)
    },
    // 删除分类按钮
    deleteCateBtn(cat_id) {
      console.log(cat_id)
      this.$emit('showDeleteCateMessageBox', cat_id)
    }
  }
}
</script>

<style scoped>
</style>
