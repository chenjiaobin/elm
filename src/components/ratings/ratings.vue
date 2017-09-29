<template>
	<div class="rate">
		<div class="rate-head clearFix">
			<div class="score-l">
				<h1>{{sellers.score}}</h1>
				<p class="text">综合评分</p>
				<p class="compare">高于周边商家{{sellers.rankRate}}%</p>
			</div>
			<div class="score-r">
				<div class="serviceScore">
					<div class="text">服务态度</div>
					<star :size="36" :score="sellers.serviceScore"></star>
					<div class="num">{{sellers.serviceScore}}</div>
				</div>
				<div class="foodScore">
					<div class="text">商品质量</div>
					<star :size="36" :score="sellers.foodScore"></star>
					<div class="num">{{sellers.foodScore}}</div>
				</div>
				<div class="time"><span class="text">送达时间</span><span class="timing">{{sellers.deliveryTime}}分钟</span></div>
			</div>
		</div>
		<split></split>
		<ratingSelect></ratingSelect>
	</div>
</template>

<script>
import star from '../../components/star/star'
import split from '../../components/split/split'
import ratingSelect from '../../components/ratingSelect/ratingSelect'
const ERRO_OK=0;
	export default {
		data(){
			return {
				sellers:{}
			}
		},
		created(){
			this.$http.get('/api/a').then((respone)=>{
				respone=respone.body;
				if(respone.errno===ERRO_OK){
					this.sellers=respone.data;
				}
			})
		},
		components:{
			star,
			split,
			ratingSelect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/basic.styl"
	.rate
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
</style>