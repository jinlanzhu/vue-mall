<template>
  <div>
    <el-card class="box-card">
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <!-- 搜索 -->
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input" clearable @clear="clearSearchList">
            <el-button slot="append" icon="el-icon-search" @click="searchGoodsBtn(input)"></el-button>
          </el-input>
        </el-col>
        <!-- 添加商品 -->
        <el-col :span="4">
          <el-button type="primary" @click="addGoodsBtn">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表区域 -->
      <el-row>
        <el-col>
          <el-table :data="goodsList" border style="width: 100%">
            <el-table-column type="index" label="#" width="50px"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="640px"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
            <el-table-column prop="add_time" label="创建时间">
              <template slot-scope="scope">{{ scope.row.add_time | showDate }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteGoodsBtn(scope.row.goods_id)"
                ></el-button>
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
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="queryInfo.pagesize"
            background
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
    goodsList: {
      type: Array
    },
    //获取商品列表的参数对象
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 2
    },
    total: Number
  },
  filters: {
    showDate(value) {
      console.log(value)
      let date = new Date(value)
      console.log(date)
      let year = date.getFullYear()
      let month = (date.getMonth() + 1 + '').padStart(2, '0')
      console.log(month)
      let days = (date.getDay() + '').padStart(2, '0')

      let hour = (date.getHours() + '').padStart(2, '0')
      let minute = (date.getMinutes() + '').padStart(2, '0')
      let second = (date.getSeconds() + '').padStart(2, '0')
      return (
        year +
        '-' +
        month +
        '-' +
        days +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      )
    }
  },
  components: {},
  methods: {
    handleSizeChange(newSize) {
      console.log(newSize)
      this.$emit('handleSizeChange', newSize)
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.$emit('handleCurrentChange', newPage)
    },
    deleteGoodsBtn(goods_id) {
      this.$emit('deleteGoods', goods_id)
    },
    searchGoodsBtn(input) {
      console.log(input)
      this.$emit('searchGoods', input)
    },
    clearSearchList() {
      this.$emit('clearSearchList')
    },
    addGoodsBtn() {
      this.$emit('addGoods')
    }
  }
}
</script>

<style scoped>
</style>
