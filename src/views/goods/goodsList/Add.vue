<template>
  <div>
    <!-- 导航 -->
    <add-nav />
    <add-form
      :add-goods-form="addGoodsForm"
      :goods-cate-list="goodsCateList"
      @handleChange="handleChange"
      :many-table-data="manyTableData"
      @tabClickedOne="tabManyData"
      @tabClickedTwo="tabOnlyDdata"
      :only-table-data="onlyTableData"
      @handleSuccess="handleSuccess"
      @handleRemove="handleRemove"
      :preview-img="previewImg"
      @handlePreview="handlePreview"
      @addGoods="addGoods"
      ref="addFormRef"
    />
    <el-dialog title="图片预览" :visible.sync="previewImgVisible" width="50%">
      <img :src="previewImg" class="preview-img" />
    </el-dialog>
  </div>
</template>

<script>
import {
  getGoodsCateList,
  getGoodsManyParamsList,
  getGoodsOnlyParamsList,
  getAddGoods
} from 'network/goods.js'
import AddNav from './childComps/AddNav'
import AddForm from './childComps/AddForm'
export default {
  data() {
    return {
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
      //商品分类列表
      goodsCateList: [],
      //商品静态参数列表
      manyTableData: [],
      //商品动态属性列表
      onlyTableData: [],
      //预览图片
      previewImg: '',
      previewImgVisible: false
    }
  },
  components: {
    AddNav,
    AddForm
  },
  computed: {
    cateId() {
      return this.addGoodsForm.goods_cat[2]
    }
  },
  created() {
    this.getGoodsCateList()
  },
  methods: {
    getGoodsCateList() {
      getGoodsCateList().then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品列表失败！')
        }
        this.goodsCateList = res.data
        console.log(this.goodsCateList)
      })
    },
    handleChange(goods_cat) {
      console.log(goods_cat)
      this.addGoodsForm.goods_cat = goods_cat
      if (this.addGoodsForm.goods_cat.length !== 3) {
        this.addGoodsForm.goods_cat = []
      }
    },
    //获取静态商品参数
    getGoodsManyParamsList() {
      getGoodsManyParamsList(this.cateId, 'many').then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品参数失败！')
        }
        //将一个字符号分割为一个数组
        res.data.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTableData = res.data
      })
    },
    //获取动态属性列表
    getGoodsOnlyParamsList() {
      getGoodsOnlyParamsList(this.cateId, 'only').then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品参数失败！')
        }
        // res.data.forEach(item => {
        //   item.attr_vals =
        //     item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        // })
        this.onlyTableData = res.data
        console.log(this.onlyTableData)
      })
    },
    tabManyData() {
      this.getGoodsManyParamsList()
    },
    tabOnlyDdata() {
      this.getGoodsOnlyParamsList()
    },
    //图片上传
    handleSuccess(response) {
      //临时路径
      const temPath = response.data.tmp_path
      this.addGoodsForm.pics.push(temPath)
      console.log(this.addGoodsForm)
    },
    //移除图片
    handleRemove(file) {
      const temPath = file.response.data.tmp_path
      // 2.从pics数组中，找到图片对应的索引值
      const index = this.addGoodsForm.pics.findIndex(x => x.pic === temPath)
      this.addGoodsForm.pics.splice(index, 1)
      console.log(this.addGoodsForm)
    },
    //预览图片
    handlePreview(file) {
      this.previewImg = file.response.data.url
      this.previewImgVisible = true
    },
    //添加商品
    addGoods() {
      console.log(this.addGoodsForm)
      this.$refs.addFormRef.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        }
        // 发送请求前：需对提交的表单进行处理goods_cat attrs
        // this.addForm.goods_cat = this.addForm.goods_cat.join(',')
        // 以上写法不对：级联选择器绑定的对象goods_cat要求是数组对象
        // 解决办法: 包：lodash 方法（深拷贝）：cloneDeep(boj)
        const form = _.cloneDeep(this.addGoodsForm)
        form.goods_cat = form.goods_cat.join(',')
        //处理动态参数
        this.manyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addGoodsForm.attrs.push(newInfo)
        })
        //处理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addGoodsForm.attrs.push(newInfo)
        })
        form.attrs = this.addGoodsForm.attrs
        // goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs
        getAddGoods(
          form.goods_name,
          form.goods_cat,
          form.goods_price,
          form.goods_number,
          form.goods_weight,
          form.goods_introduce,
          form.pics,
          form.attrs
        ).then(res => {
          console.log(res)
          if (res.meta.status !== 201) {
            return this.$message.error('商品添加失败！')
          }
          this.$message.success('商品添加成功！')
          this.$router.push('/goods')
        })
      })
    }
  }
}
</script>

<style scoped>
.preview-img {
  width: 100%;
  height: 40%;
}
</style>
