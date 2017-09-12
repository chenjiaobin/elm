<template>
	<div class="goods">
		<div class="menu">
			<ul class="lists">
				<li v-for="item in goods" class="list">
					<span class="text">
						<i v-if="item.type>0" class="icon" :class="classMap[item.type]"></i>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-item">
			<div class="food" v-for="item in goods">
				<h1 style="color:orange">{{item.name}}</h1>
				<div v-for="list in item.foods">
					<a href="#"><img :src='list.icon' alt=""></a>
					<div class="good-info">
						<p class="name">{{list.name}}</p>
						<p class="description">{{list.description}}</p>
						<p class="sale">
							<span class="month-sale">月售{{list.sellCount}}份</span>
							<span class="bullitin">好评率{{list.rating}}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const Error_OK=0;
	export default {
		data(){
			return {
				goods:{}
			}
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special'];
			this.$http.get('api/b').then((response)=>{
				response=response.body;
				if(response.errno===Error_OK){
					this.goods=response.data;
					console.log(this.goods);
				}
			})
		}
	}
</script>

<style lang="stylus" rel="relstylus/stylus">
@import '../../common/stylus/mixin.styl'
	.goods
		display:flex
		position:absolute
		top:174px
		bottom: 46px
		width:100%
		overflow:hidden
		.menu
			flex:0 0 80px
			width:80px
			background-color:#f3f5f7
			.list
				display:table
				width:56px
				height:54px
				padding:0 12px
				line-height:14px
				.text
					display:table-cell
					font-size:12px
					color:#999
					vertical-align:middle
					.icon
						display:inline-block
						width:12px
						height:12px
						background-size:12px 12px
						background-repeat:no-repeat
						vertical-align:top
						&.decrease
							back-image('decrease_3')
						&.discount
							back-image('discount_3')
						&.guarantee
							back-image('guarantee_3')
						&.invoice
							back-image('invoice_3')
						&.special
							back-image('special_3')		
		.goods-item
			flex:1
			width:100%
			overflow:auto
</style>