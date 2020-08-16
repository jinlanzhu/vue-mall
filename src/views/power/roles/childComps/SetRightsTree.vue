<template>
  <div>
    <el-tree
      ref="setRightsRef"
      :data="rightsList"
      :props="treeProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defKeys"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    rightsList: {
      type: Array
    },
    treeProps: {
      type: Object
    },
    defKeys: {
      type: Array
    }
  },
  components: {}
}
</script>

<style scoped>
</style>
