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
							<cartControl :food="food" @add="addFood"></cartControl>
						</div>
						<transition name="fade">
							<div class="addCart" @click="addFirst" v-show="!food.count||food.count==0">加入购物车</div>
						</transition>
					</div>
					<split v-show="food.info"></split>
					<div class="detail-desc" v-show="food.info">
						<h1 class="desc">商品介绍</h1>
						<p class="infos">{{food.info}}</p>
					</div>
					<split></split>
					<div class="rating">
						<h1 class="title">商品评价</h1>
						<ratignSelect @select="selectRating" @toggle="toggle"  :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratignSelect>
						<div class="rating-wrap">
							<ul v-show="food.ratings && food.ratings.length">
								<li v-show="needShow(rate.rateType,rate.text)" v-for="rate in food.ratings" class="item">

									<div class="time">{{rate.rateTime | formatDate }}</div>
									<div class="user">
										<span class="account">{{rate.username}}</span>
										<span class="icon">
											<img :src="rate.avatar" width="12px" height="12px">
										</span>
									</div>
									<div class="info">
										<span class="icon" :class="{'icon-thumb_up':rate.rateType===0,'icon-thumb_down':rate.rateType===1}"></span>
										<span class="text">{{rate.text}}</span>
									</div>
								</li>
							</ul>
							<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
						</div>
					</div>
			</div>
		</div>
	</transition>
</template>
<script>
import cartControl from "../cartControl/cartControl"
import BSscroll from "better-scroll"
import Vue from 'vue'
import split from "../split/split"
import ratignSelect from "../ratingSelect/ratingSelect"
import { formatDate } from "../../common/js/date"
	const POSITIVE=0;
	const NAGATIVE=1;
	const ALL=2;
	export default {
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showflag:false,
				selectType: ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					nagative:'吐槽'
				}
			}
		},
		methods:{
			needShow(type,text){
				// 如果switch开关是开着的话那么只要评论没内容的就会被隐藏掉
				if(this.onlyContent&&!text){
					return false;
				}
				//当选择的是全部的时候就显示全部内容
				if(this.selectType===ALL){
					return true;
				}else{
					// 当选择的是推荐的就显示推荐的选择吐槽的就显示吐槽的
					return type===this.selectType;
				}
			},
			toggle(){
				this.onlyContent=!this.onlyContent;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			selectRating(type){
				this.selectType=type;
				this.$nextTick(()=>{
					this.scroll.refresh();
				})
			},
			addFirst(event){
				if(!event._constructed){
					return;
				}
				this.$emit('add',event.target);
				Vue.set(this.food,'count',1);
			},
			addFood(event){
				this.$emit('add',event)
			},
			show(){
					this.showflag=true;
					this.selectType=ALL;
					this.onlyContent=true;
						this.$nextTick(()=>{
							if(!this.scroll){
									this.scroll=new BSscroll(this.$refs.bigWrap,{
									click:true
								})
							}else{
								this.scroll.refresh();
							}
						})
			},
			back(){
				this.showflag=false;
			}
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		},
		components:{
			cartControl,
			split,
			ratignSelect
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
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
					transition:all 0.1s
				&.fade-enter,&.fade-leave-active
					opacity:0
		.detail-desc
			margin:18px
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
		.rating
			padding-top:18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				margin:0 18px
			.rating-wrap
				padding:0 18px
				.item
					position:relative
					padding:16px 0
					border-1px(rgba(7,17,27,0.1))
					.user
						position:absolute
						top:16px
						right:0
						.account
							display:inline-block
							font-size:10px
							color:rgb(147,153,159)
							line-height:12px
							margin-right:6px
							vertical-align:top
					.time
						font-size:10px
						color:rgb(147,153,159)
						line-height:12px	
					.info
						padding-top:6px
						.icon
							display:inline-block
							font-size:12px
							line-height:24px
						  &.icon-thumb_up
								color:rgb(0,160,220)
						  &.icon-thumb_down
								color:rgb(147,153,159)
						.text
							display:inline-block
							font-size:12px
							color:rgb(7,17,27)
							line-height:16px
				.no-rating
					padding:16px 0
					font-size:12px
					color:rgb(147,153,159)
						
</style>