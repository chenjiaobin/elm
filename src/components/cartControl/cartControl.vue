<template>
	<div class="cartControl">
		<transition name="move">
			<div class="decrease" v-show="food.count>0" @click.stop.prevent="decreaseNum">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
			<div class="count" v-show="food.count>0">{{food.count}}</div>
			<div class="add icon-add_circle" @click.stop.prevent="addNum"></div>
	</div>
</template>
<script>
import Vue from 'vue'
	export default{
		props:{
			food:{
				type:Object,
			}
		},
		methods:{
			addNum(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
				this.$emit('add',event.target);
			},
			decreaseNum(){
				if(!event._constructed){
					return;
				}
				if(this.food.count>0){
					this.food.count--;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartControl
    font-size: 0
    .decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px,0, 0)
        .inner
          transform: rotate(180deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220) 
</style>