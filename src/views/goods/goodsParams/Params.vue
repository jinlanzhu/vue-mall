<template>
  <div>
    <!-- 导航 -->
    <params-nav />
    <!-- 分类参数列表 -->
    <params-list
      :cates-list="catesList"
      :selected-keys="selectedKeys"
      :cascader-props="cascaderProps"
      @handleChange="handleChange"
      :active-tag-name="activeName"
      :many-table-data="manyTableData"
      :only-table-data="onlyTableData"
      @showAddParamsDialog="showAddParamsDialog"
      @handleTagClick="handleTagClick"
      @showEditParamsDialog="showEditParamsDialog"
      @deleteParams="deleteParams"
    />

    <!-- 添加参数对话框 -->
    <el-dialog
      :title="'添加'+getTitleText"
      :visible.sync="addParamsDialogVisible"
      width="50%"
      @close="addParamsDialogClosed"
    >
      <!-- <params-add-form :add-params-form="addParamsForm" :active-name="activeTagName" /> -->
      <el-form
        :model="addParamsForm"
        :rules="addParamsRules"
        ref="addParamsRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item :label="getTitleText" prop="attr_name">
          <el-input v-model="addParamsForm.attr_name" name="attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParamsBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog
      :title="'添加'+getTitleText"
      :visible.sync="editParamsDialogVisible"
      width="50%"
      @close="editParamsDialogClosed"
    >
      <el-form
        :model="editParamsForm"
        :rules="addParamsRules"
        ref="editParamsRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item :label="getTitleText" prop="attr_name">
          <el-input v-model="editParamsForm.attr_name" name="attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editParamsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParamsBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoodsCateListByTypeToThree,
  getManyParamsList,
  getOnlyParamsList,
  getParamsList,
  getAddParams,
  getEditParams,
  getParamsListByid,
  getDeleteParams
} from 'network/category.js'

import ParamsNav from './childComps/ParamsNav'
import ParamsList from './childComps/ParamsList'
import ParamsAddForm from './childComps/ParamsAddForm'

export default {
  data() {
    return {
      //商品分类列表
      catesList: [],
      //选中的数组id
      selectedKeys: [],
      //指定联级选择器的配置对象
      cascaderProps: {
        // 配置触发选项 hover/click
        // expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      //动态参数
      manyTableData: [],
      //静态参数
      onlyTableData: [],
      activeName: 'many',
      //选中的三级分类名称的id
      selectedId: '',
      addParamsDialogVisible: false,
      //添加参数对象
      addParamsForm: {
        //参数名称
        attr_name: ''
      },
      //验证规则
      addParamsRules: {
        arrr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      },
      //修改
      editParamsDialogVisible: false,
      paramsInfo: {},
      editParamsForm: {}
    }
  },
  components: {
    ParamsNav,
    ParamsList,
    ParamsAddForm
  },
  computed: {
    //对话框标题
    getTitleText() {
      console.log(this.activeName)
      if (this.activeName === 'many') {
        return '动态参数'
      } else if (this.activeName === 'only') {
        return '静态属性'
      }
    },
    //获取三级分类id
    getCateId() {
      if (this.selectedKeys.length === 3) {
        return this.selectedKeys[2]
      }
      return null
    }
  },
  created() {
    this.getGoodsCateListByTypeToThree()
  },
  methods: {
    //获取商品分类列表
    getGoodsCateListByTypeToThree() {
      getGoodsCateListByTypeToThree().then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取失败！')
        }
        this.catesList = res.data
      })
    },
    // 级联选择框 选中变化 触发
    handleChange(selectedKeysByCateId) {
      // console.log(selectedKeysByCateId)
      this.selectedKeys = selectedKeysByCateId
      this.getData()
      this.getParamsList()
    },
    getData() {
      if (this.selectedKeys.length != 3) {
        this.selectedKeys = []
        console.log(this.selectedKeys.length)
        // 清空表格数据
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      console.log(this.selectedKeys)
    },
    //tab标签点击事件的回显函数
    handleTagClick(activeTagName) {
      this.activeName = activeTagName
      this.getParamsList()
    },
    //显示添加参数对话框
    showAddParamsDialog() {
      this.addParamsDialogVisible = true
    },
    //监听 关闭 对话框
    addParamsDialogClosed() {
      this.$refs.addParamsRef.resetFields()
    },
    //参数列表
    getParamsList() {
      getParamsList(this.getCateId, this.activeName).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('获取失败！')
        }
        if (this.activeName === 'many') {
          this.manyTableData = res.data
          console.log(this.manyTableData)
        } else if (this.activeName === 'only') {
          this.onlyTableData = res.data
          console.log(this.onlyTableData)
        }
      })
    },
    //添加参数
    getAddParams() {
      getAddParams(
        this.getCateId,
        this.addParamsForm.attr_name,
        this.activeName
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 201) {
          this.$message.error('添加失败！')
        }
        this.$message.success('添加成功！')
        this.getParamsList()
      })
    },
    //添加参数确定按钮
    addParamsBtn() {
      this.$refs.addParamsRef.validate(valid => {
        if (!valid) {
          return
        }
        this.getAddParams()
        this.addParamsDialogVisible = false
      })
    },
    //显示修改对话框
    showEditParamsDialog(attr_id) {
      getParamsListByid(this.getCateId, attr_id, this.activeName).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error('查询失败！')
        }
        this.editParamsForm = res.data
        console.log(this.editParamsForms)
      })
      this.editParamsDialogVisible = true
    },
    //监听 修改
    editParamsDialogClosed() {
      this.$refs.editParamsRef.resetFields()
    },
    //修改 确定按钮
    editParamsBtn() {
      this.getEditParams()
      this.getParamsList()
      this.editParamsDialogVisible = false
    },
    //编辑参数提交
    getEditParams() {
      this.$refs.editParamsRef.validate(valid => {
        if (!valid) {
          return
        }
        getEditParams(
          this.getCateId,
          this.editParamsForm.attr_id,
          this.editParamsForm.attr_name,
          this.editParamsForm.attr_sel
        ).then(res => {
          console.log(res)
          if (res.meta.status !== 200) {
            this.$message.error('修改参数失败！')
          }
          this.$message.success('修改参数成功！')
        })
      })
    },
    //删除
    async deleteParams(attr_id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该参数, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除该参数！')
      }
      getDeleteParams(this.getCateId, attr_id).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('删除失败！')
        }
        this.$message.success('删除成功！')
        this.getParamsList()
      })
    }
  }
}
</script>

<style scoped>
</style>
