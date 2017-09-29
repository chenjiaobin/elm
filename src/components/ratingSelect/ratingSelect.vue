<template>
	<div class="ratingSelect">
		<div class="rating-type">
			<span class="com positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="com positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span class="com nagative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.nagative}}<span class="count">{{nagatives.length}}</span></span>
		</div>
		<div  @click="toggle" class="rating-switch" :class="{'active':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看到有内容的评论</span>
		</div>
	</div>
</template>
<script>
		const POSITIVES=0;
		const NAGATIVES=1;
		const ALL=2;
	export default {
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						nagative:'不满意'
					}
				}
			}
		},
		methods:{
			toggle(){
				if(!event._constructed){
					return ;
				}
				this.$emit('toggle')
			},
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.$emit('select',type);
			}
		},
		computed:{
			positives(){
				return this.ratings.filter((rate)=>{
					return rate.rateType=== POSITIVES;
				})
			},
			nagatives(){
				return this.ratings.filter((rate)=>{
					return rate.rateType=== NAGATIVES;
				})
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.ratingSelect
		.rating-type
			padding:18px 0
			margin:0 16px
			border-1px(rgba(7,17,27,0.1))
			font-size:0
			.com
				display:inline-block
				font-size:12px
				linet-height:16px
				color:rgb(77,85,93)
				padding:8px 12px
				border-radius:1px
				margin-right:8px
				&.active
					color:#fff
				&.nagative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
				&.positive
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
				.count
					font-size:8px
					margin-left:2px
		.rating-switch
			padding:12px 18px
			line-height:24px
			border-bottom:1px solid rgba(7,17,27,0.1)
			color:rgb(147,153,159)
			&.active
				.icon-check_circle
					color:#00c850
			.icon-check_circle
				display:inline-block
				font-size:24px
				margin-right:4px
				vertical-align:middle
			.text
				font-size:12px
</style>