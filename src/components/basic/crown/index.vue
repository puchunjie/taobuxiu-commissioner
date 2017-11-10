<template>
    <div class="crown-container">
        <label>{{ tit }}</label>
        <span v-for="el in num" :key="el" :class="'crown'+pic"></span>
        <div class="tip">{{ tip }}</div>
    </div>
</template>

<script>
    export default {
        props: {
            tit: {
                type: String,
                default: ''
            },
            level: {
                type: String,
                default: '1-1'
            },
            tip: {
                type: String,
                default: ''
            }
        },
        computed: {
            num() {
                return this.level != '' ? this.level.split('-')[1] * 1 : 1;
            },
            pic() {
                return this.level != '' ? this.level.split('-')[0] : 1;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../assets/base.less';
    .crown-container {
        position: relative;
        display: inline-block;
        vertical-align: top;
        height: 16px;
        text-indent: 0!important;
        span {
            position: relative;
            top: 2px;
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 2px;
            background-repeat: no-repeat;
            background-position: center;
            &.crown1 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/1.png')
            }
            &.crown2 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/2.png')
            }
            &.crown3 {
                background-image: url('http://tbxoss.oss-cn-hangzhou.aliyuncs.com/assets/crown/3.png')
            }
        }
        .tip {
            position: absolute;
            display: none;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            text-indent: 0;
            padding: 0 10px;
            background-color: rgba(70, 76, 91, .9);
            white-space: nowrap;
            z-index: 10;
            top: 0;
            left: 20px;
            .borderRadius;
        }
        &.tip-left {
            .tip {
                top: 9px;
                right: 20px;
                left: auto;
            }
        }
        &:hover {
            .tip {
                display: block;
            }
        }
    }
</style>

