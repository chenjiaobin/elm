// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import sellers from './components/sellers/sellers'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes=[
	{path: '/goods',component: goods},
	{path: '/ratings', component: ratings},
	{path: '/sellers', component: sellers}
]
const router=new VueRouter({
	routes
})

new Vue({
	router,
	// el:'#app', // 这是vue1.0的写法
	// components:{ App } 这是vue1.0的写法
	render: h => h(App)  // 这是vue2.0的写法
}).$mount('#app')// 这是vue2.0的写法



// render:h=>h(App)是es6的箭头函数写法，他的作用是来渲染一个视图然后挂载到app上面去
// 相当于es5的
// (function(h){
// 	return h(App);
// })