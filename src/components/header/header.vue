<template>
	<div class="header">
		<div class="content-tragger">
			<div class="avatar">
				<img width="64" height="64" :src="sellers.avatar" alt="商家图标">
			</div>

			<div class="seller-info">
				<!-- 商家信息 -->
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{sellers.name}}</span>
				</div>
				<!-- 配送公司以及时间 -->
				<div class="distribution">
					{{sellers.description}}/{{sellers.deliveryTime}}分钟送达
				</div>
				<!-- 减价或折扣信息 -->
				<!-- v-if的作用是避免刚开始加载supports的时候是空值 -->
				<div class="discount" v-if="sellers.supports">
					<span class="reduce" :class="classMap[sellers.supports[0].type]"></span>
					<span class="reduce_info">{{ sellers.supports[0].description }}</span>
				</div>
			</div>
			<!-- header头部折扣按钮 -->
			<div class="supports-count" v-if="sellers.supports" @click="showDetail">
				<span class="count">{{sellers.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<!-- 公告内容 -->
		<div class="bulltin-tragger">
			<span class="bulltin-title"></span><span class="bulltin-text">{{ sellers.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<!-- header背景 -->
		<div class="background">
			<img :src="sellers.avatar" alt="背景">
		</div>
		<!-- 底部关闭按钮 -->
		<transition name="fade">
			<div class="detail" v-show="detailShow">
				<div class="detailWrap">
					<div class="detailMain">
						<h1>{{sellers.name}}</h1>
						<div class="starWrap">
							<star :size="48" :score="sellers.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div class="discount-info" v-show="sellers.supports">
							<ul>
								<li v-for="support in sellers.supports" class="item">
									<span class="icon" :class="classMap[support.type]"></span>
									<span class="text">{{support.description}}</span>
								</li>
							</ul>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="discount-info">
							<p class="main">{{sellers.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detailClose"  @click="showDetail">
					<span class="icon-close"></span>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import star from "../../components/star/star"
	export default {
		// props是用来将父组件的内容传递给子组件用的
		props : {
			sellers:{
				type:Object   //检测类型
			}
		},
		data(){
			return {
				detailShow:false,
				show:true
			}
		},
		methods:{
			showDetail:function(){
				this.detailShow=!this.detailShow;
			}
		},
		created() {
			this.classMap=['decrease','discount','guarantee','invoice','special'];
		},
		components:{
			"star":star
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 千万要注意路径的问题
@import '../../common/stylus/mixin.styl'
	.header
		position:relative
		overflow:hidden
		background-color:rgba(7,17,27,0.5)
		color:#fff
		.content-tragger
			font-size:0   //清除空隙
			position:relative
			padding:24px 12px 18px 24px
		.avatar
			display:inline-block
			margin-right:16px
			img
				border-radius:2px
		.seller-info
			font-size:16px
			display:inline-block
			vertical-align:top
			margin-top:2px
			.brand
				margin-right:6px
				display:inline-block
				vertical-align:top
				width:30px
				height:18px
				back-image('brand')
				background-size:30px 18px
			.name
				font-weight:bold
				line-height:18px
			.distribution
				font-size:12px
				font-weight:200
				line-height:12px
				margin:8px 0 10px 0
			.discount
				font-size:10px
				font-weight:200px
				line-height:12px
				.reduce
					display:inline-block
					vertical-align:top
					margin-right:4px	
					width:12px
					height:12px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						back-image('decrease_1')
					&.discount
						back-image('discount_1')
					&.guarantee
						back-image('guarantee_1')
					&.invoice
						back-image('invoice_1')
					&.special
						back-image('special_1')		
		.supports-count
			position:absolute
			right:12px
			bottom:18px
			background-color:rgba(0,0,0,0.2)
			border-radius:14px
			padding:0 8px
			height:24px
			line-height:24px
			.count
				font-size:10px
				font-weight:100px
			.icon-keyboard_arrow_right
				font-size:10px
				line-height:24px
				margin-left:2px
		.bulltin-tragger
			height:28px
			padding:0 22px 0 12px
			line-height:28px
			background-color:rgba(7,17,27,0.2)
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			position:relative
			.bulltin-title
				display:inline-block
				width:22px
				height:12px
				background-size:22px 12px
				background-repeat:no-repeat
				back-image("bulletin")
				vertical-align:top
				margin-top:9px
			.bulltin-text
				font-size:10px
				font-weight:100
				margin-left:4px
			.icon-keyboard_arrow_right
				display:inline-block
				position:absolute
				top:8px
				right:12px
				font-size:10px
		.background
			position:absolute
			top:0
			left:0
			width:100%
			height:100%
			z-index:-1
			img
				display:inline-block
				width:100%
				height:100%
				filter:blur(20px)
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		  opacity: 0
		}
		.detail
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			background:rgba(7,17,27,0.8)
			z-index:100
			overflow:auto 
			.detailWrap
				min-height:100%
				.detailMain
					padding:64px 0
					h1
						text-align:center
						font-size:16px
						line-height:16px
						font-weight:700
						margin-bottom:16px
				.title
					width:80%
					display:flex
					margin:28px auto 24px auto
					.line
						flex:1
						border-bottom:1px solid rgba(255,255,255,0.2)
						position:relative
						top:-6px
					.text
						margin:0 12px
						font-weight:700
						font-size:14px
				.discount-info
					margin:0 48px
					.item
						margin-bottom:12px
					.icon
						display:inline-block
						width:16px
						height:16px
						background-size:16px 16px
						margin-right:6px
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
						line-height:12px
						vertical-align:top
						margin-top:3px
					.main
						font-size:12px
						font-weight:200
						line-height:24px
					.fade-enter-active, .fade-leave-active {
					  transition: opacity .5s
					}
					.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
					  opacity: 0
					}
														
			.detailClose
				position:relative
				width:32px
				height:32px
				margin:-64px auto 0 auto
				clear:both
				font-size:32px
</style>