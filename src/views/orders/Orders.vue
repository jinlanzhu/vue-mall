<template>
  <div>
    <!-- 导航栏 -->
    <orders-nav />
    <!-- 订单列表 -->
    <orders-list
      :total="total"
      :orders-list="ordersList"
      :query-info="queryInfo"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @searchOrders="searchOrders"
      @clearSearchList="clearSearchList"
      @editAddress="editAddress"
      @showLogisticsDialog="showLogisticsDialog"
    />
    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="editAdrressVisible"
      width="50%"
      :before-close="editDialogClosed"
    >
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader v-model="editForm.address1" :options="citydata"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAdrressVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdrressVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流信息对话框 -->
    <el-dialog title="查看物流进度" :visible.sync="logisticsDialogVisible" width="50%">
      <!-- <el-steps direction="vertical" :active="1">
        <el-step
          :title="item.time"
          :description="item.context"
          v-for="(item, index) in logisticsList"
          :key="index"
        ></el-step>
      </el-steps>-->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in logisticsList"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import citydata from './citydata'
import { getOrdersList, getLogisticsList } from 'network/order.js'
import OrdersNav from './childComps/OrdersNav'
import OrdersList from './childComps/OrdersList'
export default {
  data() {
    return {
      //查询订单参数列表
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      //订单列表
      ordersList: [],
      //数量
      total: 0,
      editAdrressVisible: false,
      editForm: {
        address1: [],
        address2: ''
      },
      editFormRules: {
        address1: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },
      //城市 省市联动
      citydata,
      //物流信息
      logisticsList: [],
      logisticsDialogVisible: false
    }
  },
  components: {
    OrdersNav,
    OrdersList
  },
  created() {
    this.getOrdersList()
  },
  methods: {
    getOrdersList() {
      getOrdersList(
        this.queryInfo.query,
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      ).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error('获取订单列表失败！')
        }
        this.ordersList = res.data.goods
        console.log(this.ordersList)
        this.total = res.data.total
      })
    },
    //监听 页数大小
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrdersList()
    },
    //监听 当前页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrdersList()
    },
    //监听 查询按钮
    searchOrders(input) {
      this.queryInfo.query = input
      this.getOrdersList()
    },
    //清空
    clearSearchList() {
      this.queryInfo.query = ''
      this.getOrdersList()
    },
    //监听 修改地址
    editAddress() {
      this.editAdrressVisible = true
    },
    //监听 关闭事件
    editDialogClosed() {
      this.editAdrressVisible = false
      this.$refs.editFormRef.resetFields()
    },
    //获取物流信息
    getLogisticsList() {
      getLogisticsList('1106975712662').then(res => {
        console.log(res)

        if (res.meta.status !== 200) {
          return this.$message.error('获取物流信息失败！')
        }
        this.logisticsList = res.data
        console.log(this.logisticsList)
      })
    },
    showLogisticsDialog() {
      this.getLogisticsList()
      this.logisticsDialogVisible = true
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
