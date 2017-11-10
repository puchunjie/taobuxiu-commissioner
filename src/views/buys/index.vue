<template>
  <div class="container">
    <publicHead>商户求购管理
      <span class="iconfont icon-sousuo" slot="right" @click="showSearch"></span>
    </publicHead>
    <search v-model="apiData.userInfo" ref="search"></search>
    <div class="tab-bar-container">
      <div class="item" :class="{'active':statusActive == index}" v-for="(state,index) in status" :key="state.key" @click="statusActive = index">{{ `${state.value}(${state.count})` }}</div>
    </div>
    <scroller class="item-list" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
      <div class="item" v-for="(item,index) in list" :key="item.id">
        <div class="title">
          {{ item.companyName }}
          <span>{{ item.createTime | dateformat('MM/dd hh:mm') }}</span>
        </div>
        <div class="content">
          <h3>{{ `${item.ironTypeName}/${item.surfaceName}/${item.materialName}/${item.proPlacesName}` }}</h3>
          <p>{{ item.specifications != '' ? item.specifications : `${item.height}*${item.length}*${item.width}` }} {{ item.tolerance != '' ? item.tolerance : ''}}</p>
          <p>{{ item.numbers != '' ? item.numbers + item.numberUnit + ' ' : '' }}{{ item.weightUnit != '' ? item.weights + item.weightUnit : '' }}<span>{{ item.sellNum }}个报价</span></p>
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
        apiData: {
          userInfo: '',
          currentPage: 1,
          pageSize: 15,
          buyStatus: 2 //1进行中，2成交，3失效
        },
        status: [{
            key: 1,
            value: '进行中',
            count: 0
          },
          {
            key: 2,
            value: '成交',
            count: 0
          },
          {
            key: 3,
            value: '失效',
            count: 0
          }
        ],
        statusActive: 0,
        list: [],
        totalCount: 0
      }
    },
    computed: {
      maxPage() {
        return Math.ceil(this.totalCount / this.apiData.pageSize)
      },
      // 是否还能继续翻页
      canPage() {
        return this.apiData.currentPage < this.maxPage
      }
    },
    methods: {
      refresh(done) {
        this.apiData.currentPage = 1;
        this.getList().then(() => {
          done()
        })
      },
      infinite(done) {
        if (this.canPage) {
          console.log(1)
          this.apiData.currentPage++;
          this.getList(false).then(() => {
            done()
          })
        }else{
          console.log(2)
          done(true)
          // this.infinite = undefined
        }
      },
      // 显示搜索
      showSearch() {
        this.$refs.search.isFocus = true
      },
      // 获取列表数据
      getList(isFalsh = true) {
        return this.$http.post('/sys/salemanIronBuy/queryBindIronBuyList', this.apiData).then(res => {
          if (res.code === 1000) {
            if (isFalsh) {
              this.list = res.data.list;
            } else {
              this.list.push(...res.data.list);
            }
            this.status[0].count = res.data.ing;
            this.status[1].count = res.data.get;
            this.status[2].count = res.data.miss;
            this.totalCount = res.data.totalCount;
          }
        })
      }
    },
    watch: {
      statusActive(val){
        this.apiData.buyStatus = this.status[val].key;
        this.apiData.currentPage = 1;
        this.getList();
      }
    },
    created() {
      this.getList();
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
      &.active {
        color: @base_blue;
        font-weight: 500;
      }
    }
  }
</style>

