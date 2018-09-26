<template>
  <div >
    <v-header :sellers="sellers"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item" v-intro="'商品列表'" v-intro-step="3">商品</router-link>
      <router-link to="/ratings" class="tab-item" v-intro="'商品的评论'" v-intro-step="4">评论</router-link>
      <router-link to="/sellers" class="tab-item" v-intro="'商家信息'" v-intro-step="5">商家</router-link>  
    </div>
    <!-- 这个是视图的输出位置，也就是路由的输出页面 -->
    <keep-alive>
      <router-view :seller="sellers"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import { getUrlPara } from './common/js/getPara.js'
import { getStore, saveStore } from "@/common/js/storage.js"

const Error_OK=0;
export default {
  // name: 'app',
  components:{
    "v-header":header
  },
  data(){
    return {
      sellers:{
        id:(()=>{
          let urlPara=getUrlPara();
          console.log(urlPara);
          return urlPara.id;
        })()
      }
    }
  },
  created(){
     this.$http.get('https://www.easy-mock.com/mock/5a2d323b73225d015a529609/chenjiaobin/seller').then( (response) =>{
      response=response.body;
        // this.sellers=response.data;
        this.sellers=Object.assign({},this.sellers,response.seller);
    })
  },
  mounted () {
			console.log(getStore('_showGuide'))
			if (!getStore('_showGuide')) {
				console.log('进来了')
				saveStore('_showGuide', 'true')
				let that = this
				this.$nextTick(()=>{
						that.$intro().setOptions({
							'prevLabel':'上一步',
							'nextLabel':'下一步',
							'skipLabel':'跳过',
							'doneLabel': '完成'
						}).start()
				})
			}
		},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'
  .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-1px(#ccc)
      .tab-item
        flex:1
        text-align:center
        &>a
          display:block
        &.active
            color:red

</style>
