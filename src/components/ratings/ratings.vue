<template>
	<div class="rate" ref="re">
		<div class="content">
			<div class="rate-head clearFix">
				<div class="score-l">
					<h1>{{seller.score}}</h1>
					<p class="text">综合评分</p>
					<p class="compare">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="score-r">
					<div class="serviceScore">
						<div class="text">服务态度</div>
						<star :size="36" :score="seller.serviceScore"></star>
						<div class="num">{{seller.serviceScore}}</div>
					</div>
					<div class="foodScore">
						<div class="text">商品质量</div>
						<star :size="36" :score="seller.foodScore"></star>
						<div class="num">{{seller.foodScore}}</div>
					</div>
					<div class="time"><span class="text">送达时间</span><span class="timing">{{seller.deliveryTime}}分钟</span></div>
				</div>
			</div>
			<split></split>
			<ratingSelect @select="selectRating" @toggle="toggle" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="rate"></ratingSelect>
			<div class="rate-Wrap">
				<ul>
					<li  v-show="needShow(item.rateType,item.text)" class="rate-item" v-for="item in rate">
						<div class="icon item-l">
							<img :src="item.avatar" width="28" height="28">
						</div>
						<div class="item-r">
							<div class="name">{{item.username}}</div>
							<div class="component">
								<star :size="24" :score="item.score"></star>
								<span class="deliver" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
							</div>
							<div class="text">{{item.text}}</div>
							<div class="rateType">
								<span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>
								<span class="recommend" v-for="list in item.recommend">{{list}}</span>
							</div>
							<div class="time">{{item.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../../components/star/star'
import split from '../../components/split/split'
import ratingSelect from '../../components/ratingSelect/ratingSelect'
import BScroll from 'better-scroll'
import { formatDate } from "../../common/js/date"
const ERRO_OK=0;
const positive=1;
const NAGATIVE=2;
const ALL=2;
	export default {
		data(){
			return {
				selectType: ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'满意',
					nagative:'不满意'
				},
				rate:[]
			}
		},
		props:{
			seller:{
				type:Object
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
			}
		},
		created(){
			this.$http.get('/api/c').then((respone)=>{
				respone=respone.body;
				if(respone.errno===ERRO_OK){
					this.rate=respone.data;
					this.$nextTick(()=>{
						this.scroll=new BScroll(this.$refs.re,{
							click:true
						})
					})
				}
			})
		},
		components:{
			star,
			split,
			ratingSelect
		},
		filters:{
			formatDate(time){
				let date=new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/basic.styl"
@import "../../common/stylus/mixin.styl"
	.rate
		position:absolute
		top:174px
		left:0
		bottom:0
		width:100%
		overflow:hidden
		.rate-head
			display:flex
			padding:18px 0
			font-size:0
			.score-l
				flex:0 0 138px
				width:138px
				text-align:center
				box-sizing:border-box
				border-right:1px solid rgba(7,17,27,0.1)
				@media only screen and (max-width:320px)
					flex:0 0 120px
					width:120px
				h1
					font-size:24px
					line-height:28px
					color:rgb(255,153,0)
				.text
					font-size:12px
					color:rgb(7,17,27)
					line-height:12px
					margin:6px 0 8px 0
				.compare
					font-size:10px
					line-height:10px
					color:rgba(7,17,27,0.6)
					margin-bottom:6px
			.score-r
				flex:1
				padding:0 24px
				@media only screen and (max-width:320px)
					padding:0 6px
				.serviceScore,.foodScore,.time
					.text
						display:inline-block
						vertical-align:top
						font-size:12px
						color:rgb(7,17,27)
						line-height:18px
					.star
						display:inline-block
						vertical-align:top
						margin:0 12px
						line-height:18px
					.num
						display:inline-block
						vertical-align:top
						font-size:12px
						line-height:18px
						color:rgb(255,153,0)
				.foodScore
					margin:8px 0
				.time
					.timing
						font-size:12px
						color:rgb(147,153,159)
						line-height:18px
						margin:0 12px
		.rate-Wrap
			padding:0 18px
			.rate-item
				display:flex
				padding:18px 0
				border-1px(rgba(7,17,27,0.1))
				.item-l
					flex:0 0 28px
					width:28px
					margin-right:12px
					img
						display:inline-block
						width:28px
						height:28px
						border-radius:50%
				.item-r
					flex:1
					.name
						font-size:10px
						color:rgb(7,17,27)
						line-height:12px
					.component
						margin:4px 0 6px 0
						font-size:0
						.star
							display:inline-block
							margin-right:6px
							vertical-align:top
						.deliver
							display:inline-block
							font-size:10px
							font-weight:200
							color:rgb(147,153,159)
							line-height:12px
							vertical-align:top
					.text
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
						margin-bottom:8px
					.rateType
						position:relative
						.icon-thumb_up
							display:inline-block
							color:rgb(0,160,220)
							margin-right:8px
							margin-bottom:4px
						.icon-thumb_down
							display:inline-block
							color:rgb(183,187,191)
							margin-bottom:4px
						.recommend
							display:inline-block
							padding:0 6px
							font-size:9px
							color:rgb(147,153,159)
							line-height:16px
							background:#fff
							border:1px solid rgba(7,17,27,0.1)
							border-radius:1px
							margin-right:8px
							margin-bottom:4px
					.time
						position:absolute
						right:18px
						top:18px
						font-size:10px
						font-weight:200
						color:rgb(147,153,159)
						line-height:12px
</style>