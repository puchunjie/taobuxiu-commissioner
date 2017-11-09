<template>
  <div>
    <publicHead>标题</publicHead>
    商家列表
    <bottomTab></bottomTab>
  </div>
</template>

<script>
import publicHead from '@/components/header'
import bottomTab from '@/components/bottomTab'
export default {
  components: {
    bottomTab,
    publicHead
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
  
</style>

