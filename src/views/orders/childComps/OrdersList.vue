<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable v-model="input" @clear="clearSearchList">
            <el-button slot="append" icon="el-icon-search" @click="searchOrdersBtn(input)"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表 -->
      <el-row>
        <el-col>
          <el-table :data="ordersList" border style="width: 100%">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="order_id" label="订单编号" width="400px"></el-table-column>
            <el-table-column prop="order_price" label="订单价格"></el-table-column>
            <el-table-column prop="pay_status" label="是否付款">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.order_pay === '1'">已付款</el-tag>
                <el-tag type="danger" v-else>未付款</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"></el-table-column>
            <el-table-column prop="create_time" label="下单时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="editAddressBtn"></el-button>
                <el-button
                  size="mini"
                  type="success"
                  icon="el-icon-location-outline"
                  @click="logisticsBtn"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-row>
        <el-col>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="queryInfo.pagesize"
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
    //查询订单参数列表
    queryInfo: {
      query: '',
      pagenum: 1,
      pagesize: 2
    },
    ordersList: {
      type: Array,
      default() {
        return []
      }
    },
    total: Number
  },
  components: {},
  methods: {
    //监听 页数大小
    handleSizeChange(newSize) {
      this.$emit('handleSizeChange', newSize)
    },
    //监听当前页
    handleCurrentChange(newPage) {
      this.$emit('handleCurrentChange', newPage)
    },
    // 搜索按钮
    searchOrdersBtn(input) {
      console.log(input)
      this.$emit('searchOrders', input)
    },
    //监听 清空
    clearSearchList() {
      this.$emit('clearSearchList')
    },
    // 监听  修改地址按钮
    editAddressBtn() {
      this.$emit('editAddress')
    },
    logisticsBtn() {
      this.$emit('showLogisticsDialog')
    }
  }
}
</script>

<style scoped>
</style>
