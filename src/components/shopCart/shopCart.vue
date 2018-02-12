<template>
	<div class="shopCart">
		<div class="content" >
			<div class="shopCart-left" @click="showFoodList">
				<div class="logo">
					<div class="icon" :class="{'highLight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">
						<span>{{totalCount}}</span>
					</div>
				</div>
				<div class="sale-info">
					<div class="price">￥{{total}}元</div>
					<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				</div>
			</div>
			<div class="shopCart-right" :class="this.total<this.minPrice?'not-enough':'enough'" @click="pay">
				<p>{{payDesc}}</p>
			</div>
		</div>
		<div class="ballContain">
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<!-- 外层动画 -->
						<div class="ball" v-show="ball.show">
													<!-- 内层动画 -->
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
		</div>
		<transition name="up">
			<div class="food-list" v-show="show">
				<div class="header clearFix">
					<div class="title">购物车</div>
					<div class="clear" @click="empty">清空</div>
				</div>
				<div class="content" ref="goodshow">
					<ul class="list">
						<li class="item clearFix" v-for="food in selectFood">
							<div class="name">{{food.name}}</div>
							<div class="right">
								<div class="price"><i>￥</i>{{food.price*food.count}}</div>
								<div class="cartControl-wrap">
										<cartControl :food="food"></cartControl>	
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mark" v-show="show" @click="showFoodList"></div>
		</transition>
	</div>
</template>
<script>
import BScroll from 'better-scroll'
import cartControl from "../cartControl/cartControl"
	export default {
		components:{
				cartControl
		},
		data(){
			return {
				balls:[
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				}
				],
				dropBalls:[],
				flag:true  //true的话就是list折叠起来
			}
		},
		methods:{
			pay(){
				if(this.total<this.minPrice){
					return ;
				}
				window.alert(`下单成功，您支付了${{this.total}}元`);
			},
			empty(){
				this.selectFood.forEach((food)=>{
					food.count=0;
				})
			},
			showFoodList(){
					if(!this.total){
							return;
					}
					this.flag=!this.flag;
			},
			dropBall(el){
				for(let i=0;i<this.balls.length;i++){
					if(!this.balls[i].show){
						this.balls[i].show=true;
						this.balls[i].el=el;
						this.dropBalls.push(this.balls[i]);
						return;
					}
				}
			},
			beforeDrop(el){
				let count=this.balls.length;
				while(count--){
					let ball=this.balls[count];
					if(ball.show){
						let rect=ball.el.getBoundingClientRect();//获取小球的位移
						let x=rect.left-32;
						let y=-(window.innerHeight-rect.top-22);
						el.style.display='';
						el.style.webkitTransform=`translate3d(0,${x}px,0)`;
						el.style.transform=`translate3d(0,${y}px,0)`;

						let inner=el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
						inner.style.transform=`translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping(el,done){
				/*eslint-disable no-unused-vars*/
				let rf=el.offsetHeight;
				this.$nextTick(()=>{
					el.style.webkitTransform='translate3d(0,0,0)';
					el.style.transform='translate3d(0,0,0)';
					let inner=el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform='translate3d(0,0,0)';
					inner.style.transform='translate3d(0,0,0)';
					el.addEventListener('transitionend',done);
				})
			},
			afterDrop(el){
				let ball=this.dropBalls.shift();
				if(ball){
					ball.show=false;
					el.style.display="none";
				}
			}
		},
		props:{
			minPrice:{
				type:Number,
				default:0
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			selectFood:{
				type:Array,
				default(){
					return [
						{
							price:10,
							count:2
						}
					];
				}
			}
		},
		computed:{
			show(){
					if(!this.total){
						this.flag=true;
						return false;
					}
					let a=!this.flag;
					if(a){
						this.$nextTick(()=>{
							if(!this.scroll){
								this.scroll=new BScroll(this.$refs.goodshow,{
									click:true
								});
							}else{
								this.scroll.refresh();
							}
						})
					}
					return a;
			},
			total(){
				let totalPrice=0;
				this.selectFood.forEach((good)=>{
					totalPrice+=good.count*good.price;
				})
				return totalPrice
			},
			totalCount(){
				let count=0;
				this.selectFood.forEach((food)=>{
					count+=food.count
				})
				return count
			},
			payDesc(){
				if(this.total===0){
					return `￥${this.minPrice}元起送`;
				}else if(this.total<this.minPrice){
					let diff=this.minPrice-this.total;
					return `还差￥${diff}元起送`;
				}else{
					return `去结算`;
				}
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/basic.styl"
@import "../../common/stylus/mixin.styl"
	.shopCart
		position:fixed
		left:0
		bottom:0
		width:100%
		height:48px
		z-index:50
		.content
			display:flex
			font-size:0
			background:#141d27
			.shopCart-left
				flex:1
				.logo
					display:inline-block
					position:relative
					vertical-align:top
					top:-10px
					margin:0 12px
					padding:6px
					width:58px
					height:58px
					box-sizing:border-box
					background:#141d27
					border-radius:50%
					.icon
						background:#2b343c
						width:100%
						height:100%
						border-radius:50%
						text-align:center
						&.highLight
							background:rgb(0,160,220)
						.icon-shopping_cart
							font-size:24px
							color:rgba(255,255,255,0.4)
							text-align:center
							line-height:46px
							&.highLight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						background:rgb(240,20,20)
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
						border-radius:16px
						text-align:center
						span
							font-size:9px
							font-weight:700
							color:#fff
							line-height:16px
				.sale-info
					display:inline-block
					padding-left:12px
					.price
						font-size:18px
						font-weight:700
						color:rgb(255,255,255)
						margin-top:6px
						vertical-align:top
					.desc
						vertical-align:top
						font-size:10px
						color:rgba(255,255,255,0.4)
						margin-top:6px
			.shopCart-right
				flex:0 0 105px
				line-height:48px
				font-size:12px
				color:rgba(255,255,255,0.4)
				font-weight:700
				text-align:center
				&.not-enough
					background:#2b333b
				&.enough
					background:#00b43c
					color:#fff
		.ballContain
			.ball
				position:fixed
				left:32px
				bottom:22px
				z-index:300
				transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
				.inner
					width:16px
					height:16px
					border-radius:50%
					background:rgb(0,160,220)
					transition:all 0.4s linear
		.food-list
			position:absolute
			left:0
			top:0
			width:100%
			z-index:-1
			transform:translate3d(0,-100%,0)
			&.up-enter-active,&.up-leave-active
				transition:all 0.5s
			&.up-enter,&.up-leave-active
				transform:translate3d(0,0,0)
			.header
				background:#f3f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size:14px
					font-weight:200
					color:rgb(7,17,27)
					line-height:40px
					margin-left:18px
				.clear
					float:right 
					font-size:12px
					line-height:40px
					color:rgb(0,160,220)
					margin-right:18px
			.content
				background:#fff
				max-height:217px
				overflow:hidden
				.list
					width:100%
					height:100%
					.item
						margin:12px 18px
						border-bottom:1px solid rgba(7,17,27,0.1)
						.name
							float:left
							font-size:14px
							color:rgb(7,17,27)
							line-height:24px
						.right
							float:right
							.price
								display:inline-block
								font-size:14px
								color:rgb(240,153,159)
								font-weight:700
								line-height:24px
								margin-right:12px
								vertical-align:top
								i
									font-size:10px
									font-weight:normal
							.cartControl-wrap
								display:inline-block
								margin-top:-6px
		.mark
			position:fixed
			top:0
			left:0
			width:100%
			height:100%
			background:rgba(7,17,27,0.6)
			backdrop-filter:blur(10px)
			z-index:-4
			&.fade-enter-active,&fade-leave-active
				transition:all 0.5s
			&.fade-enter,&fade-leave-active
				opacity:0
				background:rgba(7,17,27,0.6)
</style>