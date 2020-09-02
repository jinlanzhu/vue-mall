<template>
  <div>
    <goods-nav />
    <goods-list
      :goods-list="goodsList"
      :query-info="queryInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @deleteGoods="deleteGoods"
      @searchGoods="searchGoods"
      @clearSearchList="clearSearchList"
      @addGoods="addGoods"
    />
  </div>
</template>

<script>
import { getGoodsList, getDeleteGoods } from 'network/goods.js'

import GoodsNav from './childComps/GoodsNav'
import GoodsList from './childComps/GoodsList'
export default {
  data() {
    return {
      //获取商品列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      //商品列表
      goodsList: [],
      //商品总数
      total: 0
    }
  },
  components: {
    GoodsNav,
    GoodsList
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    //获取商品列表
    getGoodsList() {
      getGoodsList(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error('获取商品列表失败！')
        }
        this.goodsList = res.data.goods
        this.total = res.data.total
      })
    },
    //监听 每页显示的商品条数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    // 监听 当前的页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    //删除商品
    async deleteGoods(goods_id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除该商品！')
      }
      getDeleteGoods(goods_id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('删除该商品失败！')
        }
        this.$message.success('删除该商品成功！')
        this.getGoodsList()
      })
    },
    //搜索商品
    searchGoods(input) {
      this.queryInfo.query = input
      this.getGoodsList()
    },
    //清空查询的列表，并重置列表
    clearSearchList() {
      this.queryInfo.query = ''
      this.getGoodsList()
    },
    //添加商品按钮
    addGoods() {
      this.$router.push({ name: 'addGoods' })
    }
  }
}
</script>

<style scoped>
</style>
