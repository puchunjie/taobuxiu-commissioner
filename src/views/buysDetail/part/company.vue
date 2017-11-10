<template>
    <div class="company-warp">
        <h3>{{ company.companyName }}</h3>
        <p>{{ company.proInfo | emptyHlod('暂无') }}</p>
        <p>{{ company.storeHouseName | emptyHlod('暂无') }}</p>
    </div>
</template>

<script>
export default {
  props:['company']
}
</script>


<style lang="less" scoped>
    @import url('../../../style/mixin.less');
    .company-warp {
        width: 100%;
        padding: .1rem;
        background-color: @background_gray;
    }
</style>
