<template>
  <div>
    <!-- 面包屑导航栏 -->
    <cate-nav />
    <!-- 分类列表 -->
    <cates-list
      :cates-list="catesList"
      :toal="total"
      :query-cate-info="queryCateInfo"
      @handlePageSize="handlePageSize"
      @handleCurrentPage="handleCurrentPage"
      @showAddCateDialog="showAddCateDialog"
      @showEditCateDialog="showEditCateDialog"
      @showDeleteCateMessageBox="showDeleteCateMessageBox"
    />
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClosed"
    >
      <!-- 主体区域 -->
      <cate-add-form
        ref="addCateRef"
        :add-cate-form="addCateForm"
        :parent-cates-list="parentCatesList"
        :cascader-props="cascaderProps"
        :selected-keys="selectedKeys"
        @parantCateChanged="parantCateChanged"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改分类区域 -->
    <!-- <cate-edit-form :edit-cate-dialog="editCateDialog" /> -->
    <el-dialog
      title="修改分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
      @close="editCateDialogClosed"
    >
      <!-- 主体区域 -->
      <cate-edit-form :edit-cate-form="editCateForm" ref="editCateRef" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除分类区域 -->
  </div>
</template>

<script>
import {
  getGoodsCateList,
  getGoodsCateListByType,
  getAddCate,
  getCateListByCatId,
  getEditCateById,
  getDeleteCate
} from 'network/category.js'

import CateNav from './childComps/CateNav'
import CatesList from './childComps/CatesList'
import CateAddForm from './childComps/CateAddForm'
import CateEditForm from './childComps/CateEditForm'

export default {
  data() {
    return {
      //商品分类列表
      catesList: [],
      //获取分类参数列表的对象
      queryCateInfo: {
        type: '',
        // 当前页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 5
      },
      //商品分类条数
      total: 0,
      addCateDialogVisible: false,
      //添加分类的参数
      addCateForm: {
        //分类名称
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      //父级分类的列表
      parentCatesList: [],
      //指定联级选择器的配置对象
      cascaderProps: {
        // 配置触发选项 hover/click
        // expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //选中的父级分类的id数组
      selectedKeys: [],
      //根据分类id查询的信息
      cateInfo: {},
      editCateDialogVisible: false,
      //修改的参数
      editCateForm: {
        cat_name: ''
      }
    }
  },
  components: {
    CateNav,
    CatesList,
    CateAddForm,
    CateEditForm
  },
  created() {
    this.getGoodsCateList()
  },

  methods: {
    // 获取分类列表
    getGoodsCateList() {
      getGoodsCateList(
        this.queryCateInfo.type,
        this.queryCateInfo.pagenum,
        this.queryCateInfo.pagesize
      ).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类列表失败！')
        }
        console.log(res)
        this.catesList = res.data.result
        this.total = res.data.total
      })
    },
    // 监听 页数大小
    handlePageSize(newSize) {
      this.queryCateInfo.pagesize = newSize
      this.getGoodsCateList()
    },
    // 监听 当前页码值
    handleCurrentPage(newPage) {
      this.queryCateInfo.pagenum = newPage
      this.getGoodsCateList()
    },
    //添加分类dialog显示
    showAddCateDialog() {
      this.getGoodsCateListByType()
      this.addCateDialogVisible = true
    },

    /**
     * 获取type=2以上的分类列表
     */
    getGoodsCateListByType() {
      getGoodsCateListByType().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取分类列表失败！')
        }
        this.parentCatesList = res.data
      })
    },
    // 监听联级
    parantCateChanged(selectedKeysById) {
      this.selectedKeys = selectedKeysById
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        this.addCateForm.cat_level = this.selectedKeys.length
        return
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    /**
     * 添加分类
     */
    getAddCate() {
      getAddCate(
        this.addCateForm.cat_pid,
        this.addCateForm.cat_name,
        this.addCateForm.cat_level
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加分类失败！')
        }
        this.$message.success('添加分类成功！')
        this.addCateForm = res.data
      })
    },
    addCateBtn() {
      this.$refs.addCateRef.$refs.addCateRef.validate(valid => {
        if (!valid) {
          return
        }
      })
      this.getAddCate()
      // this.addCateDialogVisible = false
      this.getGoodsCateList()
    },
    // 监听 关闭 对话框
    addCateDialogClosed() {
      this.$refs.addCateRef.$refs.addCateRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    },
    //修改分类名称
    showEditCateDialog(cat_id) {
      this.catesList.cat_id = cat_id
      console.log('bianji')
      getCateListByCatId(this.catesList.cat_id).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取失败！')
        }
        // this.cateInfo = res.data
        this.editCateForm = res.data
      })
      this.editCateDialogVisible = true
    },
    editCateDialogClosed() {},
    editCateBtn() {
      this.$refs.editCateRef.$refs.editCateRef.validate(valid => {
        if (!valid) {
          return
        }
      })
      this.getEditCateById()
      this.getGoodsCateList()
      this.editCateDialogVisible = false
    },
    //编辑分类提交
    getEditCateById() {
      getEditCateById(
        this.editCateForm.cat_id,
        this.editCateForm.cat_name
      ).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('修改分类名称失败！')
        }
        this.$message.success('修改分类名称成功！')
      })
    },
    async showDeleteCateMessageBox(cat_id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该分类, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除该分类！')
      }
      getDeleteCate(cat_id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('删除失败！')
        }
        this.$message.success('删除成功！')
        this.getGoodsCateList()
      })
    }
  }
}
</script>

<style scoped>
</style>
