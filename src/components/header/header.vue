<template>
	<div class="header">
		<div class="content-tragger">
			<div class="avatar">
				<img width="64" height="64" :src="sellers.avatar" alt="商家图标">
			</div>
			<div class="seller-info">
				<div class="title">
					<span class="brand">品牌</span>
					<span class="name">{{sellers.name}}</span>
				</div>
				<div class="distribution">
					{{sellers.description}}/{{sellers.deliveryTime}}分钟送达
				</div>
				<!-- v-if的作用是避免刚开始加载supports的时候是空值 -->
				<div class="discount" v-if="sellers.supports">
					<span class="reduce">减</span>
					<span>{{ sellers.supports[0].description }}</span>
				</div>
			</div>
		</div>
		<div class="bulltin-tragger"></div>
	</div>
</template>

<script>
	export default {
		// props是用来将父组件的内容传递给子组件用的
		props : {
			sellers:{
				type:Object   //检测类型
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 千万要注意路径的问题
@import '../../common/stylus/mixin.styl'
	.header
		background-color:#000
		color:#fff
		padding:24px 12px 18px 24px
		.content-tragger
			font-size:0   //清除空隙
		.avatar
			display:inline-block
			margin-right:16px
		.seller-info
			font-size:16px
			display:inline-block
			vertical-align:top
			margin-top:2px
			.brand
				margin-right:6px
				
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
					margin-right:4px				
</style>