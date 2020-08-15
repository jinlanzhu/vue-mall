<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-table stripe :data="rightsList" border style="width: 100%">
            <el-table-column type="index" label="#" width="50px"></el-table-column>
            <el-table-column prop="authName" label="权限名称"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column prop="level" label="权限等级">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
                <el-tag v-else type="warning">三级</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    rightsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
