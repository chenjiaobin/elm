<template>
	<transition name="fly">
		<div v-show="showflag" class="foodDetail" ref="bigWrap" >
			<div>
					<div class="detail-header">
						<img :src="food.image">
						<span class="back icon-arrow_lift" @click="back"></span>
					</div>
					<div class="detail-content">
						<div class="name">{{food.name}}</div>
						<div class="desc">
							<span class="monthSale">月售{{food.sellCount}}份</span>
							<span class="goodRating">好评率{{food.rating}}%</span>
						</div>
						<div class="price">
							<span class="new"><span>￥</span>{{food.price}}</span>
							<span class="old" v-show="food.oldPrice"><span>￥</span>{{food.oldPrice}}</span>
						</div>
						<div class="control" v-show="food.count>0">
							<cartControl :food="food"></cartControl>
						</div>
						<transition name="fade">
							<div class="addCart" @click="addFirst" v-show="!food.count||food.count==0">加入购物车</div>
						</transition>
					</div>
					<split></split>
					<div class="detail-desc" v-show="food.info">
						<h1 class="desc">商品介绍</h1>
						<p class="infos">{{food.info}}</p>
					</div>
					<split></split>
			</div>
		</div>
	</transition>
</template>
<script>
import cartControl from "../cartControl/cartControl"
import BSscroll from "better-scroll"
import Vue from 'vue'
import split from "../split/split"
	export default {
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showflag:false
			}
		},
		methods:{
			addFirst(event){
				if(!event._constructed){
					return;
				}
				console.log(event.target);
				this.$emit('add',event.target);
				Vue.set(this.food,'count',1);
			},
			show(){
					this.showflag=true;
					if(!this.scroll){
						this.$nextTick(()=>{
								this.scroll=new BSscroll(this.$refs.bigWrap,{
								click:true
							})
						})
					}else{
						this.scroll.refresh();
					}
			},
			back(){
				this.showflag=false;
			}
		},
		components:{
			cartControl,
			split
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.foodDetail
		position:fixed
		top:0
		left:0
		bottom:46px
		width:100%
		background:#fff
		overflow:hidden
		transform:translate3d(0,0,0)
		&.fly-enter-active,&.fly-leave-active
			transition:all 0.2s linear
		&.fly-enter,&.fly-leave-active
			transform:translate3d(100%,0,0)
		.detail-header
			position:relative
			top:0
			left:0
			widht:100%
			height:0
			padding-top:100%
			img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
			.back
				position:absolute
				top:10px
				left:10px
				font-size:10px
				padding:10px
				color:#fff
				text-shadow:#000 2px 2px 3px
		.detail-content
			position:relative
			padding:18px
			.name
				font-size:14px
				font-weight:700
				color:rgb(7,17,27)
				line-height:14px
			.desc
				margin:8px 0 18px 0
				font-size:10px
				color:rgb(147,153,159)
				line-height:10px
				.monthSale
					margin-right:12px
			.price
				.new
					font-size:14px
					font-weight:700
					color:rgb(240,20,20)
					line-height:24px
					margin-right:12px
					span
						font-size:10px
						font-weight:normal
				.old
					font-size:10px
					font-weight:700
					color:rgb(147,153,159)
					line-height:24px
					text-decoration:line-through
					span
						font-weight:normal
			.control
				position:absolute
				bottom:18px
				right:18px
			.addCart
				position:absolute
				bottom:18px
				right:18px
				padding:6px 12px
				background:rgb(0,160,220)
				height:24px
				border-radius:24px
				font-size:10px
				color:rgb(255,255,255)
				line-height:24px
				opacity:1
				&.fade-enter-active,&.fade-leave-active
					transition:all 0.2s
				&.fade-enter,&.fade-leave-active
					opacity:0
		.detail-desc
			width:100%
			padding:18px
			.desc
				font-size:14px
				color:rgb(7,17,27)
				margin-bottom:6px
			.infos
				font-size:12px
				font-weight:200
				color:rgb(77,85,93)
				line-height:24px
				padding:0 8px
</style>