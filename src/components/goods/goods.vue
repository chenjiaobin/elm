<template>
	<div class="goods">
		<div class="menu-item"></div>
		<div class="goods-item"></div>
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
			this.$http.get('api/b').then((response)=>{
				response=response.body;
				if(response.errno===Error_OK){
					this.goods=response;
					console.log(this.goods);
				}
			})
		}
	}
</script>

<style lang="stylus" rel="relstylus/stylus">
	.goods
		display:flex
		background-color:red
		position:relative
		top:174px
		bottom: 50px
</style>