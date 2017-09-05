<template>
  <div >
    <v-header></v-header>
    <div class="tab border-1px">
      <!-- <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/sellers'}">商家</a>
      </div>  -->
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/sellers" class="tab-item">商家</router-link>  
    </div>
    <!-- 这个是视图的输出位置，也就是路由的输出页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
export default {
  // name: 'app',
  components:{
    "v-header":header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
  .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      // border-bottom:1px solid #ccc
      border-1px(#000)
      .tab-item
        flex:1
        text-align:center
        &>a
          display:block
        &.active
            color:red

</style>
