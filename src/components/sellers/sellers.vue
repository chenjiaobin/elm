<template>
	<div class="seller" ref="wrap">
		<div class="content">
			<div class="seller-head">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="rateCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="item">
						<div class="title">起送价</div>
						<div class="doller">
							<span class="num">{{seller.minPrice}}</span>
							<span class="text">元</span>
						</div>
					</li>
					<li class="item">
						<div class="title">商家配送</div>
						<div class="doller">
							<span class="num">{{seller.deliveryPrice}}</span>
							<span class="text">元</span>
						</div>
					</li>
					<li class="item">
						<div class="title">平均配送时间</div>
						<div class="doller">
							<span class="num">{{seller.deliveryTime}}</span>
							<span class="text">元</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<div class="text">{{favoriteText}}</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<div class="title">
					<h1>公告与活动</h1>
					<p>{{seller.bulletin}}</p>
				</div>
				<div class="supports-wrap">
					<ul>
						<li v-for="support in seller.supports" class="item">
							<span class="icon" :class="classMap[support.type]"></span>
							<span class="text">{{support.description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="pic">
				<h1>商家实景</h1>
				<div class="pic-wrap" ref="pics">
					<ul class="pic-item" ref="pic">
						<li class="item" v-for="item in seller.pics">
							<img :src="item" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="sellerInfo">
				<h1>商家信息</h1>
				<ul class="info">
					<li class="item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import star from "../star/star"
import split from "../split/split"
import {saveLocal,loadLocal} from "../../common/js/store"
	export default {
		data(){
			return {
				favorite:(()=>{
					return loadLocal(this.seller.id,"favorite",false);
				})()
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?'已收藏':'收藏'
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			star,
			split
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special'];
		},
		// 使用watch方法是为了监听seller数据的变化，因为seller数据是异步获取的，并不一定能够马上获取，没有seller数据就无法渲染dom结构，而bscroll是基于dom结构来执行的，所以需要执行初始化函数
		watch:{
			seller(){
				this.$nextTick(()=>{
					this._initScroll();
					this._initPic();
				})
			}
		},
		// mounted方法是确认dom结构渲染完成，因为bscroll是基于dom结构的，当切换页面的时候，dom会重新渲染，当并不一定马上完成，，所以需要在渲染完dom结构后再次执行初始化函数
		mounted(){
			this.$nextTick(()=>{
				this._initScroll();
				this._initPic();
			})
		},
		methods:{
			_initScroll(){
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.wrap,{
						click:true
					})
				}else{
					this.scroll.refresh();
				}
			},
			_initPic(){
				if(this.seller.pics){
				let itemWidth=120;
				let margin=6;
				let width=(itemWidth+margin)*this.seller.pics.length-margin;
				this.$refs.pic.style.width=width+"px";
				this.$nextTick(()=>{
					if(!this.picScroll){
						this.picScroll=new BScroll(this.$refs.pics,{
						scrollX:true,
						eventPassthrough:'vertical'
					})
					}else{
						this.picScroll.refresh();
					}
				})
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite=!this.favorite;
				// console.log(this.seller.id);
				saveLocal(this.seller.id,"favorite",this.favorite);
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.seller
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.seller-head
			position:relative
			padding:18px 18px 0 18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
			.desc
				padding:8px 0 18px 0
				border-1px(rgba(7,17,27,0.1))
				.star
					display:inline-block
					vertical-align:top
					margin-right:8px
				.rateCount
					margin-right:12px
				.rateCount,.sellCount
					display:inline-block
					vertical-align:top
					font-size:10px
					color:rgb(77,85,93)
					line-height:18px
			.remark
				padding:18px 0
				font-size:0
				.item
					display:inline-block
					width:33%
					text-align:center
					border-right:1px solid rgba(7,17,27,0.1)
					&:last-child
						border-right:none
					.title
						font-size:10px
						color:rgb(147,153,159)
						line-height:10px
						margin-bottom:4px
					.doller
						font-weight:200
						color:rgb(7,17,27)
						line-height:24px
						.num
							font-size:24px
						.text
							font-size:10px
			.favorite
				position:absolute
				width:46px
				top:18px
				right:13px
				text-align:center
				span
					display:block
					font-size:24px
					line-height:24px
					margin-bottom:4px
					&.active
						color:rgb(240,20,20)
				.text
					font-size:10px
					color:rgb(77,85,93)
					line-height:10px
		.bulletin
			padding:18px 18px 0 18px
			.title
				padding-bottom:16px
				h1
					font-size:14px
					line-height:14px
					color:rgb(7,17,27) 
					margin-bottom:8px
				p
					font-size:12px
					font-weight:200
					color:rgb(240,20,20)
					line-height:24px
					padding-left:12px
			.supports-wrap
				.item
					padding:16px 12px
					border-top:1px solid rgba(7,17,27,0.1)
					.icon
						display:inline-block
						width:16px
						height:16px
						background-size:16px 16px
						background-repeat:no-repeat
						margin-right:6px
						vertical-align:top
						&.decrease
							back-image('decrease_2')
						&.discount
							back-image('discount_2')
						&.guarantee
							back-image('guarantee_2')
						&.invoice
							back-image('invoice_2')
						&.special
							back-image('special_2')
					.text
						display:inline-block
						font-size:12px
						font-weight:200
						color:rgb(7,17,27)
						line-height:16px
						vertical-align:top
		.pic
			padding:18px
			h1
				font-size:14px
				line-height:14px
				color:rgb(7,17,27) 
				margin-bottom:12px
			.pic-wrap
				width:100%
				overflow:hidden
				white-space:nowrap
				.pic-item
					font-size:0
					.item
						display:inline-block
						margin-right:6px
						width:120px
						height:90px
						&:last-child
							margin-right:0
		.sellerInfo
			padding:18px
			h1
				font-size:14px
				line-height:14px
				color:rgb(7,17,27) 
				margin-bottom:12px
			.item
				border-top:1px solid rgba(7,17,27,0.1)
				padding:16px 12px
				font-size:12px
				font-weight:200
				line-height:16px
				color:rgb(7,17,27)
</style>