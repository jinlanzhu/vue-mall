<template>
  <div>
    <el-card class="box-card">
      <!-- 提示信息 -->
      <el-row>
        <el-col>
          <el-alert title="添加商品信息" show-icon type="info" :closable="false"></el-alert>
        </el-col>
      </el-row>

      <!-- 添加步骤信息 -->
      <el-row>
        <el-col>
          <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </el-col>
      </el-row>

      <!-- 步骤 -->
      <el-row>
        <el-col>
          <el-form
            :model="addGoodsForm"
            :rules="addGoodsRules"
            ref="addFormRef"
            label-width="100px"
            label-position="top"
          >
            <el-tabs
              v-model="activeIndex"
              tab-position="left"
              :before-leave="beforeLeave"
              @tab-click="tabClicked"
            >
              <!-- 基本信息 -->
              <el-tab-pane label="基本信息" name="0">
                <el-form-item label="商品名称" prop="goods_name">
                  <el-input v-model="addGoodsForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goods_price">
                  <el-input type="number" v-model="addGoodsForm.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop="goods_weight">
                  <el-input type="number" v-model="addGoodsForm.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量" prop="goods_number">
                  <el-input type="number" v-model="addGoodsForm.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                  <el-cascader
                    v-model="addGoodsForm.goods_cat"
                    :options="goodsCateList"
                    :props="cascaderProps"
                    @change="handleChange"
                  ></el-cascader>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品参数" name="1">
                <el-form-item
                  :label="item.attr_name"
                  v-for="item in manyTableData"
                  :key="item.attr_id"
                >
                  <el-checkbox-group
                    v-model="item.attr_vals"
                    v-for="(itemVal, index) in item.attr_vals"
                    :key="index"
                  >
                    <el-checkbox :label="itemVal" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品属性" name="2">
                <el-form-item
                  :label="item.attr_name"
                  v-for="item in onlyTableData"
                  :key="item.attr_id"
                >
                  <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="商品图片" name="3">
                <el-upload
                  action="http://47.115.124.102:8888/api/private/v1/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  list-type="picture"
                  :headers="headersObject"
                  :on-success="handleSuccess"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-tab-pane>
              <el-tab-pane label="商品内容" name="4">
                <quill-editor v-model="addGoodsForm.goods_introduce" />
                <el-button type="primary" @click="addGoodsBtn">添加商品</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      //校验规则
      addGoodsRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      value: [],
      // 级联选择器配置
      cascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      //设置上传的请求头部对象
      headersObject: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  },
  props: {
    //添加商品的参数
    addGoodsForm: {
      goods_name: '',
      //价格
      goods_price: 0,
      goods_weight: 0,
      goods_number: 0,
      goods_cat: [],
      pics: [],
      //介绍
      goods_introduce: '',
      //商品属性
      attrs: []
    },
    //商品分类
    goodsCateList: {},
    //静态参数
    manyTableData: {
      type: Array,
      default: []
    },
    //动态属性
    onlyTableData: {
      type: Array,
      default: []
    },
    //图片路径
    previewImg: {
      type: String
    }
  },
  components: {},
  computed: {},
  methods: {
    handleChange() {
      console.log(this.addGoodsForm.goods_cat)
      this.$emit('handleChange', this.addGoodsForm.goods_cat)
    },
    //监听 切换标签之前的钩子
    beforeLeave(activeName, oldActiveName) {
      console.log(activeName)
      console.log(oldActiveName)
      if (oldActiveName === '0' && this.addGoodsForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    //监听 tab 被选中时触发
    tabClicked() {
      if (this.activeIndex === '1') {
        this.$emit('tabClickedOne')
      } else if (this.activeIndex === '2') {
        this.$emit('tabClickedTwo')
      }
    },
    //图片预览
    handlePreview(file) {
      console.log(file)
      this.$emit('handlePreview', file)
    },
    //移除图片
    handleRemove(file) {
      console.log(file)
      this.$emit('handleRemove', file)
    },
    //图片上传成功
    handleSuccess(response) {
      console.log(response)
      this.$emit('handleSuccess', response)
    },
    //添加商品按钮
    addGoodsBtn() {
      this.$emit('addGoods')
    }
  }
}
</script>

<style scoped>
.el-alert {
  justify-content: center;
}

.el-steps {
  margin-top: 15px;
}
.el-tabs {
  margin-top: 15px;
}
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.el-button {
  margin-top: 15px;
}
</style>
