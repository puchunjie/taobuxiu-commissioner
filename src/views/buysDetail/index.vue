<template>
  <div class="detail-container">
    <publicHead>求购详情</publicHead>
    <div class="status-banner">
        <span class="status-str">{{ ironBuy.buyStatus | statusStr }}</span>
        <div class="count-warp">
          <h3>{{ miss }}</h3>
          <p>错过</p>
        </div>
        <div class="count-warp">
          <h3>{{ vaild }}</h3>
          <p>报价</p>
        </div>
    </div>
    <div class="iron-item">
      <div class="title">
        <router-link :to="'businessDetial-'+company.userId">{{ company.companyName }}<span class="iconfont icon-arrow-right"></span></router-link>
        <span class="date">{{ ironBuy.createTime | dateformat('MM/dd hh:mm') }}</span>
      </div>
      <div class="content">
        <h3>{{ `${ironBuy.ironTypeName}/${ironBuy.surfaceName}/${ironBuy.materialName}/${ironBuy.proPlacesName}` }}</h3>
        <p>{{ ironBuy.specifications != '' ? ironBuy.specifications : `${ironBuy.height}*${ironBuy.width}*${ironBuy.length}` }} {{ ironBuy.tolerance != '' ? ironBuy.tolerance : ''}}</p>
        <p>
          {{ ironBuy.numbers != '' ? ironBuy.numbers + ironBuy.numberUnit + ' ' : '' }}{{ ironBuy.weightUnit != '' ? ironBuy.weights + ironBuy.weightUnit : '' }}
        </p>
        <p class="mark">
          备注：{{ ironBuy.remark }}
        </p>
      </div>
      <div class="footer">
        <a class="contant" :href="'tel:'+company.contactNum">联系买家</a>
      </div>
    </div>
    <div class="offer-list">
      <div class="contnet bt" v-if="ironBuy.buyStatus == 2">
        <div class="item done">
          <p><span class="price">成交价：{{ validSell[0].offerPerPrice }}元/{{ validSell[0].baseUnit }}</span></p>
          <p class="remark">公差：{{ validSell[0].tolerance | emptyHlod('-') }}&nbsp;&nbsp;&nbsp;&nbsp;产地：{{ validSell[0].offerPlaces }}</p>
          <p class="remark">备注：{{ validSell[0].offerRemark }}</p>
          <Company :company="validSell[0]"></Company>
        </div>
      </div>
      <p class="head">报价列表</p>
      <div class="contnet" v-for="(item,index) in validSell" :key="index">
        <div class="item">
          <p><span class="price">{{ item.offerPerPrice }}元/{{ item.baseUnit }}</span>  <span>{{ item.tolerance | emptyHlod('') }}</span>  {{ item.offerPlaces }}</p>
          <p class="remark">备注：{{ item.offerRemark }}</p>
          <Company :company="item"></Company>
        </div>
        <span class="success iconfont icon-ziyuan1" v-if="ironBuy.buyStatus == 2 && index == 0"></span>
      </div>
      <div class="contnet" v-for="(item,index) in missSell" :key="index">
        <div class="item">
          <p><span class="price">该商家选择了忽略</span></p>
          <Company :company="item"></Company>
        </div>
      </div>
    </div>
    <p style="text-align:center" v-show="vaild == 0 && miss == 0">暂无报价</p>
  </div>
</template>

<script>
  import publicHead from '@/components/header'
  import Company from './part/company.vue'
  export default {
    components: {
      publicHead,
      Company
    },
    data() {
      return {
        missSell: [],
        validSell: [],
        ironBuy: {},
        company: {}
      }
    },
    computed: {
      ironBuyId() {
        return this.$route.params.ironBuyId
      },
      // 报价数
      vaild(){
        return this.validSell.length
      },
      // 错过数
      miss(){
        return this.missSell.length
      }
    },
    filters: {
      statusStr(val){
        switch (val*1) {
          case 1:
            return '进行中'
            break;
          case 2:
            return '已成交'
            break;
          case 3:
            return '已过期'
            break;  
          default:
            return '未知状态'
            break;
        }
      }
    },
    methods: {
      getData() {
        this.$http.post('/sys/salemanIronBuy/queryBindIronSellInfo', {
          ironBuyId: this.ironBuyId
        }).then(res => {
          if (res.code === 1000) {
            let data = res.data;
            this.missSell = data.missSell;
            this.validSell = data.validSell;
            this.ironBuy = data.ironBuy;
            this.company = {
              companyName: data.companyName,
              contact: data.contact,
              contactNum: data.contactNum,
              userId: data.userId,
            }
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>


<style lang="less" scoped>
  @import url('../../style/mixin.less');
  .detail-container {
    padding: .46rem 0 0 0;
  }
  
  .status-banner {
    width: 100%;
    height: .75rem;
    line-height: .51rem;
    padding: .12rem .2rem;
    background-image: url('../../assets/bitmap.png');
    background-repeat: no-repeat;
    background-size: cover;
    .status-str{
      color: #fff;
      font-size: .18rem;
      margin-left: .15rem;
    }
    .count-warp{
      width: .45rem;
      height: .5rem;
      .borderRadius(.04rem);
      background-color: #fff;
      float: right;
      text-align: center;
      overflow: hidden;
      margin-left: .1rem;
      h3{
        margin-top: .04rem;
        line-height: .22rem;
        font-size: .22rem;
      }
      p{
        line-height: .2rem;
        font-size: .12rem;
        color: @font_light;
      }
    }
  }
  
  .iron-item {
    width: 100%;
    background-color: #fff;
    margin-bottom: .08rem;
    overflow: hidden;
    color: @font_dark;
    margin-top: .08rem;
    .title {
      position: relative;
      width: 100%;
      height: .35rem;
      line-height: .35rem;
      border-bottom: 1px solid @line_light_gray;
      text-indent: .15rem;
      font-size: .14rem;
      span.date {
        position: absolute;
        right: .15rem;
        font-size: .12rem;
        color: @font_light;
      }

      a{
        color:@font_dark;
      }
      
    }
    .content {
      position: relative;
      width: 100%;
      padding: .1rem .15rem;
      font-size: .14rem;
      line-height: .26rem;
      h3 {
        width: 2.8rem;
        font-size: .14rem;
        font-weight: bold;
        .ellipsis;
      }
      p {
        position: relative;
        width: 100%;
        &.mark {
          color: @font_light;
        }
      }
    }
    .footer {
      width: 100%;
      height: .5rem;
      line-height: .5rem;
      text-align: right;
      border-top: 1px solid @line_light_gray;
      a.contant {
        display: inline-block;
        height: .3rem;
        line-height: .24rem;
        padding: 0 .16rem;
        text-align: center;
        color: @base_blue;
        border: 2px solid @base_blue;
        font-size: .15rem;
        margin-right: .15rem;
      }
    }
  }

  .offer-list{
    width: 100%;
    margin: .08rem 0 .3rem 0;
    background-color: #fff;
    .head{
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      font-size: .16rem;
      font-weight: bold;
      border-bottom: 1px solid @line_light_gray;
    }
    .contnet{
      position: relative;
      width: 100%;
      padding: .15rem;
      border-bottom: 1px solid @line_light_gray;
      .item{
        font-size: .14rem;
        p{
          line-height: .24rem;
        }
        .price{
          color:@status_red;
          font-weight: bold;
        }
        span{
          margin-right: .1rem;
        }
        .remark{
          color:@font_light;
        }

        &.done{
          .price{
            font-size: .24rem;
          }
        }
      }
      
      &:last-child{
        border: 0;
      }

      &.bt{
        border-bottom: .08rem solid @background_gray;
      }

      .success{
        position: absolute;
        right: 0;
        top: -.03rem;
        font-size: .42rem;
        color: @status_red;
      }
    }
  }
</style>
