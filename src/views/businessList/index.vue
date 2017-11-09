<template>
  <div class="container">
    <publicHead>标题</publicHead>
    <div class="mid-container">
      <search v-model="text"></search>
      <div class="item-list">
        <scroller :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949">
          <p v-for="el in 20" :key="el">{{ el }}</p>
        </scroller>
      </div>
    </div>
    <bottomTab></bottomTab>
  </div>
</template>

<script>
  import publicHead from '@/components/header'
  import bottomTab from '@/components/bottomTab'
  import search from '@/components/search'
  export default {
    components: {
      bottomTab,
      publicHead,
      search
    },
    data() {
      return {
        text: ''
      }
    },
    methods: {
      refresh(done) {
        setTimeout(() => {
          console.log("刷新")
          done()
        }, 1500)
      },
      infinite(done) {
        setTimeout(() => {
          console.log("加载")
          done()
        }, 1500)
      }
    }
  }
</script>

<style lang="less" scoped>
  .mid-container {
    width: 100%;
    height: 100%;
    padding: .4rem 0 .5rem 0;
    .item-list{
      position: relative;
      height: calc(~"100% - .4rem");
      p{
        line-height: .3rem;
      }
    }
  }
</style>

