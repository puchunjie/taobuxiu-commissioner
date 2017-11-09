<template>
  <div class="container">
    <publicHead>商户求购管理
      <span class="iconfont icon-sousuo" slot="right" @click="test"></span>
    </publicHead>
    <search v-model="text" ref="search"></search>
    <div class="tab-bar-container">
      <div class="item">进行中（100）</div>
      <div class="item">进行中（100）</div>
      <div class="item">进行中（100）</div>
    </div>
    <scroller class="item-list" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
      <div class="item" v-for="el in 20">
        <div class="title">
          公司名称
          <span>04/31 18:32</span>
        </div>
        <div class="content">
          <h3>品类/表面/材质/产地</h3>
          <p>规格/公差</p>
          <p>数量/重量<span>8个报价</span></p>
        </div>
      </div>
    </scroller>
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
      },
      test() {
        console.log(1)
        this.$refs.search.isFocus = true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mixin.less';
  .item-list {
    padding: .98rem 0 .55rem 0;
    .item {
      width: 100%;
      background-color: #fff;
      margin-bottom: .08rem;
      overflow: hidden;
      color: @font_dark;
      .title {
        position: relative;
        width: 100%;
        height: .35rem;
        line-height: .35rem;
        border-bottom: 1px solid @line_light_gray;
        text-indent: .15rem;
        span {
          position: absolute;
          right: .15rem;
          font-size: 12px;
          color: @font_light;
        }
      }
      .content {
        width: 100%;
        padding: .1rem .15rem;
        font-size: .14rem;
        line-height: .26rem;
        h3 {
          width: 2.8rem;
          font-size: .14rem;
          font-weight: 500;
          .ellipsis;
        }
        p {
          position: relative;
          width: 100%;
          span {
            position: absolute;
            right: 0;
            font-size: 12px;
            color: @font_light;
          }
        }
      }
    }
  }
  
  .tab-bar-container {
    position: fixed;
    box-sizing: content-box;
    width: 100%;
    height: .44rem;
    background-color: #fff;
    z-index: 998;
    border-bottom: .08rem solid @background_gray;
    .flex-block;
    .item {
      text-align: center;
      height: .44rem;
      line-height: .44rem;
      .flex-grow;
      font-size: .14rem;
      border-right: 1px solid @line_light_gray;
      &:last-child {
        border: 0;
      }
    }
  }
</style>

