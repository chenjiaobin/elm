<template>
	<div class="goods">
		<div class="menu" ref="menuWrapper">
			<ul class="lists">
				<li v-for="(item,index) in goods" class="list" :class="{'current':currentIndex===index}"  @click="changeFood(index,$event)">
					<span class="text">
						<i v-if="item.type>0" class="icon" :class="classMap[item.type]"></i>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div ref="foodWrap" class="goods-item">
			<div>
				<!-- 所有分类下的所有商品 -->
				<div class="food food-hook" v-for="item in goods" >
					<!-- 分类标题 -->
					<h1 class="title">{{item.name}}</h1>
					<!-- 分类下的所有商品 -->
					<div v-for="list in item.foods" class="food-item" @click="mySelectDetail(list,$event)">
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
						<div class="control">
							<cartControl @add="addFood" :food="list"></cartControl>
						</div>
					</div>
				</div>
			</div>
		</div>
		<shopCart ref="a"  :selectFood="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
	 <foodDetail @add="addFood" :food="mySelect" ref="detailShow"></foodDetail>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from "../shopCart/shopCart"
import cartControl from "../cartControl/cartControl"
import foodDetail from "../foodDetail/foodDetail"
const Error_OK=0;
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				mySelect:{}
			}
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special'];
			this.$http.get('api/b').then((response)=>{
				response=response.body;
				if(response.errno===Error_OK){
					this.goods=response.data;
					this.$nextTick(()=>{
						this.initScroll();
						this.calculateHeight();	
						// this.changeFood();
					})
				}
			})
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if(this.scrollY>=height1 && this.scrollY<height2){
						return i+1;
					}

				}
				return 0;
			},
			selectFood(){
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		methods:{
			mySelectDetail(list,event){
				if(!event._constructed){
					return;
				}
				this.mySelect=list;
				this.$refs.detailShow.show();
			},
			initScroll(){
				this.menuScorll=new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll=new BScroll(this.$refs.foodWrap,{
					probeType:3,
					click:true
				});
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));
				})
			},
			calculateHeight(){ 
				let foodHook=this.$refs.foodWrap.getElementsByClassName("food-hook");
				let height=0;
				for(let i=0;i<foodHook.length;i++){
					let item=foodHook[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			changeFood(index,event){
				if(!event._constructed){
					return;
				}
				// 不要直接在纸标签上使用ref，要是这样的话点击的时候回出现问题
				let foodList=this.$refs.foodWrap.getElementsByClassName("food-hook");//
				let el=foodList[index];
				this.foodsScroll .scrollToElement(el,300);
			},
			addFood(target){
				this.drop(target);
			},
			drop(target){
				this.$nextTick(()=>{
					this.$refs.a.dropBall(target);
				})
			}
		},
		components:{
			"shopCart":shopCart,
			"cartControl":cartControl,
			"foodDetail":foodDetail
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
				&.current
					background-color:#fff
					font-size:700
					position:relative
					margin-top:-1px
					z-index:10
					.text
						border-none()
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
						line-height:14px
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
				.control
					position:absolute
					right:0
					bottom:10px
				
</style>
