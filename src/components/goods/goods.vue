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
			<!-- 所有分类下的所有商品 -->
			<div class="food" v-for="item in goods">
				<!-- 分类标题 -->
				<h1 class="title">{{item.name}}</h1>
				<!-- 分类下的所有商品 -->
				<div v-for="list in item.foods" class="food-item">
					<!-- 每件商品对应的图片 -->
					<a href="#" class="icon"><img :src='list.icon' alt="" width="57" height="57"></a>
					<!-- 每件商品对应的信息 -->
					<div class="good-info">
						<p class="name">{{list.name}}</p>
						<p class="description">{{list.description}}</p>
						<p class="sale">
							<span class="month-sale">月售{{list.sellCount}}份</span>
							<span class="bullitin">好评率{{list.rating}}</span>
						</p>
						<p class="price">
							<span class="new-price"><i class="doller">￥</i>{{list.price}}</span>
							<span class="old-price" v-show="list.oldPrice"><i class="doller">￥</i>{{list.oldPrice}}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			
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
					border-1px(rgba(7,17,27,0.1))
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
			.title
				background-color:#f3f5f7
				height:26px
				border-left:2px solid #d9dde1
				font-size:12px
				line-height:26px
				color:rgb(147,153,159)
				padding-left:13px
			.food-item
				display:flex
				padding:18px 0
				margin:0 18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					border-none()
				.icon
					display:inline-block
					width:57px
					height:57px
				.good-info
					flex:1
					margin-left:10px
					.name
						font-size:14px
						line-height:14px
						color:rgb(7,17,27)
						margin:2px 0 0 0
					.description,.sale
						font-size:10px
						line-height:10px
						color:rgb(147,153,159)
						margin:8px 0
					.new-price
						font-size:14px
						line-height:24px
						font-weight:700
						color:rgb(240,20,20)
						margin-right:8px
						.doller
							font-size:10px
							font-style:normal
					.old-price
						font-size:10px
						line-height:24px
						font-weight:700
						color:rgb(147,153,159)
						text-decoration:line-through
						.doller
							font-style:normal
							
							
						
						
					
						
				
				
</style>