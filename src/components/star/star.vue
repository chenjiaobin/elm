<template>
	<div class="star" :class="starType">
		<span v-for="item in items" :class="item" class="starClass"></span>
	</div>
</template>
<script type="text/ecmascript-6">
		const Len=5;
		const Von="on";
		const Vhalf="half";
		const Voff="off";
	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-'+this.size;
			},
			items(){
					let items=[];
					// 判断星星个数有没有半个的，即score带0.5的
					let score=Math.floor(this.score*2)/2;
					// 判断score时候有小数点，有的话着星星有半个
					let hasDecimal=score%1!==0;
					let integer=Math.floor(this.score);
					for(var i=0;i<integer;i++){
						items.push(Von);
					};
					if(hasDecimal){
						items.push(Vhalf);
					}
					while(items.length<Len){
						items.push(Voff);
					}
					return items;
				}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.star
		text-align:center
		.starClass
			display:inline-block
			background-repeat:no-repeat
		&.star-24
			.starClass
				width:10px
				height:10px
				background-size:10px 10px
				margin-right:3px
				&:last-child
					margin-right:0
				&.on
					back-image('star24_on')
				&.half
					back-image('star24_half')
				&.off
					back-image('star24_off')
		&.star-36
			.starClass
				width:15px
				height:15px
				background-size:15px 15px
				margin-right:6px
				&:last-child
					margin-right:0
				&.on
					back-image('star36_on')
				&.half
					back-image('star36_half')
				&.off
					back-image('star36_off')
		&.star-48
			.starClass
				width:20px
				height:20px
				background-size:20px 20px
				margin-right:22px
				&:last-child
					margin-right:0
				&.on
					back-image('star36_on')
				&.half
					back-image('star36_half')
				&.off
					back-image('star36_off')
</style>
