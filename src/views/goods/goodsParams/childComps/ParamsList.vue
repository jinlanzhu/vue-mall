<template>
  <div>
    <el-card class="box-card">
      <!-- 提示框 -->
      <el-row>
        <el-col>
          <el-alert :closable="false" title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
        </el-col>
      </el-row>
      <!-- 商品分类 -->
      <el-row>
        <el-col>
          <p>
            选择商品分类：
            <el-cascader
              v-model="selectedKeysByCateId"
              :options="catesList"
              :props="cascaderProps"
              @change="handleChange"
            ></el-cascader>
          </p>
        </el-col>
      </el-row>
      <!-- tags标签页 -->
      <el-tabs v-model="activeTagName" @tab-click="handleTagClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
          <el-row>
            <el-col>
              <el-button
                size="mini"
                type="primary"
                @click="addParamsBtn"
                :disabled="isBtnDisabled"
              >添加参数</el-button>
            </el-col>
          </el-row>
          <!-- 参数列表 -->
          <el-row>
            <el-col>
              <el-table border :data="manyTableData">
                <el-table-column type="expand" width="70"></el-table-column>
                <el-table-column label="#" type="index" width="70"></el-table-column>
                <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="editParamsBtn(scope.row.attr_id)"
                    >修改</el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="deleteParamsBtn(scope.row.attr_id)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加参数按钮 -->
          <el-row>
            <el-col>
              <el-button
                size="mini"
                type="primary"
                @click="addParamsBtn"
                :disabled="isBtnDisabled"
              >添加属性</el-button>
            </el-col>
          </el-row>
          <!-- 参数列表 -->
          <el-row>
            <el-col>
              <el-table border :data="onlyTableData">
                <el-table-column type="expand" width="70">
                  <template slot-scope="scope">
                    <el-tag
                      v-for="(item, i) in scope.row.attr_vals"
                      :key="i"
                      closable
                      @close="handleClose(i, scope.row)"
                    >{{item}}</el-tag>
                    <!-- 输入Tag文本框 -->
                    <el-input
                      class="input-new-tag"
                      v-if="scope.row.inputVisible"
                      v-model="scope.row.inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
                    ></el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput(scope.row)"
                    >+ New Tag</el-button>
                  </template>
                </el-table-column>
                <el-table-column label="#" type="index" width="70"></el-table-column>
                <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="editParamsBtn(scope.row.attr_id)"
                    >修改</el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="deleteParamsBtn(scope.row.attr_id)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedKeysByCateId: '',
      options: [
        {
          value: '',
          label: '',
          children: []
        }
      ],
      activeTagName: ''
    }
  },
  props: {
    catesList: {
      type: Array
    },
    selectedKeys: {
      type: Array
    },
    //指定联级选择器的配置对象
    cascaderProps: {
      // 配置触发选项 hover/click
      // expandTrigger: 'hover',
      value: 'cat_id',
      label: 'cat_name',
      children: 'children'
    },
    manyTableData: {
      type: Array
    },
    onlyTableData: {
      type: Array
    },
    activeName: {
      type: String,
      default: 'many'
    },
    //动态参数
    manyTableData: {
      type: Array
    },
    //静态参数
    onlyTableData: {
      type: Array
    }
  },
  created() {
    this.selectedKeysByCateId = this.selectedKeys
    this.activeTagName = this.activeName
  },
  components: {},
  computed: {
    //是否禁用
    isBtnDisabled() {
      if (this.selectedKeysByCateId.length !== 3) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleChange() {
      console.log(this.activeTagName)
      this.$emit('handleChange', this.selectedKeysByCateId)
    },
    //tab标签点击事件的处理函数
    handleTagClick() {
      this.$emit('handleTagClick', this.activeTagName)
    },
    //添加属性按钮
    addParamsBtn() {
      this.$emit('showAddParamsDialog')
    },
    //修改参数
    editParamsBtn(attr_id) {
      console.log(attr_id)
      this.$emit('showEditParamsDialog', attr_id)
    },
    deleteParamsBtn(attr_id) {
      this.$emit('deleteParams', attr_id)
    },
    // 文本框失去焦点,或者按下Enter触发
    handleInputConfirm(row) {
      // 输入的内容为空时，清空
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 提交数据库，保存修改
      this.saveAttrVals(row)
    },
    // 将对attr_vals（Tag） 的操作 保存到数据库
    async saveAttrVals(row) {
      const { data: res } = await this.$http.put(
        `categories/${this.getCateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改参数项失败！')
      }
      this.$message.success('修改参数项成功！')
    },
    // 点击按钮显示输入框
    showInput(row) {
      row.inputVisible = true
      //   让输入框自动获取焦点
      // $nextTick方法的作用：当页面元素被重新渲染之后，才会至指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除对应的参数可选项
    handleClose(i, row) {
      row.attr_vals.splice(i, 1)
      this.saveAttrVals(row)
    }
  }
}
</script>

<style scoped>
</style>
