<template>
    <div class="bottom-nav">
        <router-link class="item" to="index"><span class="iconfont icon-shouye"></span></router-link>
        <router-link class="item" to="index"><span class="iconfont icon-keyuanguanli"></span></router-link>
        <router-link class="item" to="index"><span class="iconfont icon-gerenzhongxin"></span></router-link>
    </div>
</template>

<style lang="less" scoped>
    @import '../../style/mixin.less';
    .bottom-nav{
        position: fixed;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid @line_light_gray;
        .flex-block;
        .item{
            text-align: center;
            .flex-grow;
        }
        .iconfont{
            font-size: .2rem;
        }
    }
</style>
