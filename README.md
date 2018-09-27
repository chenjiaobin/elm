# elm

> 这是一个仿饿了么webApp
> 访问[地址](https://chenjiaobin.github.io/elm/)
> 二维码访问

![饿了么](https://raw.githubusercontent.com/chenjiaobin/elm/master/resource/1515046300.png)

### 这个webApp用到的技术
1. vue2.0相关语法以及
2. 脚手架工具的使用
3. webpack
4. stylus的使用
5. 对项目的框架结构的搭建
6. 单页面应用
7. 路由
8. better-scroll的使用
9. mock数据
### 项目中用到的相关库的介绍
1. vue-resoure做后端数据交互ajax
2. vue-router前端路由实现单页应用
3. 列表滚动主要是通过第三方库better-scroll
4. 收藏的功能是通过h5的缓存方式localstorage
5. stick footer的技术，就是页面底部当文档高度没有达到页面高度(浏览器高度)的时候，页面底部会在最底部,如果文档高度超过浏览器高度底部就是在文档底部
6. flex弹性布局
7. 移动端1像素问题
### 科普
> 关于drp的科普:
window.devicePixelRatio是设备上物理像素和设备独立像素(device-independent pixels (dips))的比例。公式表示就是：window.devicePixelRatio = 物理像素 / dips
1. 非视网膜屏幕的iphone上，屏幕物理像素320像素，独立像素也是320像素，因此，window.devicePixelRatio等于1.
2. 在视网膜屏幕的iphone上，屏幕物理像素640像素，独立像素还是320像素，因此，window.devicePixelRatio等于2.
### 安装并使用说明
> npm install
> npm run dev（开发环境）
> npm run build（发布环境）
### 注意：

1、因为我这个是通过travis进行持续集成的，所以对于静态文件的应用被我更改了,在config文件夹里面的index.js文件里面的assetsSubDirectory路径和assetsPublicPath路径更改成`./static和./`,如果在本地找不到静态文件的话，那你就去这个文件里面将这两个路径前面的点去掉
```
//在线
assetsSubDirectory: './static',
assetsPublicPath: './',
//开发环境
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
```
2、线上是用easy-mock的数据的，当然我在项目里面也有本地json文件，里面的数据也是可以用的，数据访问路径也是配置好了,就在/build/dev-server.js里面
```
// 调取json数据
var appData=require('../data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;
// 编写路由
var apiRouter=express.Router();
// 写接口

apiRouter.get('/a',function(req,res){
  res.json({
    errno:0,
    data: seller
  });
});
apiRouter.get('/b',function(req,res){
  res.json({
    errno:0,
    data:goods
  });
});
apiRouter.get('/c',function(req,res){
  res.json({
    errno:0,
    data:ratings
  });
});
```
3. 开发环境的路径请求,这个是请求我在本地的json文件的数据
```
created(){
    this.$http.get('/api/a?id='+this.sellers.id).then( (response) =>{
      response=response.body;
      if(response.errno===Error_OK){
        // this.sellers=response.data;
        this.sellers=Object.assign({},this.sellers,response.data);
      }
    })
  }
```
4. 线上的路径请求，这个请求的数据是我在easy-mock上配置好的数据
```
created(){
     this.$http.get('https://www.easy-mock.com/mock/5a2d323b73225d015a529609/chenjiaobin/seller').then( (response) =>{
      response=response.body;
        // this.sellers=response.data;
        this.sellers=Object.assign({},this.sellers,response.seller);
    })
  }
```
### 添加新手引导
1. 安装[intro.js](https://github.com/usablica/intro.js)依赖
npm i intro.js --S 
2. 安装[vue-introjs](https://github.com/alex-oleshkevich/vue-introjs)依赖,这个主要是讲intro.js的api暴露给vue使用
npm i vue-introjs --S
3. 在入口文件(我的是main.js)添加如下代码
```
import VueIntro from 'vue-introjs'
Vue.use(VueIntro);
import 'intro.js/introjs.css';
```
3. 在webpack文件引入如下代码，因为intro.js这个插件需要全局的introJs这个变量
```
// 这个我在webpack.dev.conf.js和webpack.prod.conf.js都配置了
{
    plugins: [
        new webpack.ProvidePlugin({
            // other modules
            introJs: ['intro.js', 'introJs']
        })
    ]
}
```
4. 接着就可以在vue页面上使用了,具体可以参考[网址](https://github.com/alex-oleshkevich/vue-introjs)
```
// 例如
<div class="avatar" v-intro="'商家图标'" v-intro-step="1">
  <img width="64" height="64" :src="sellers.avatar" alt="商家图标">
</div>
mounted() {
this.$nextTick(()=>{
 that.$intro().setOptions({
      'prevLabel':'上一步',
      'nextLabel':'下一步',
      'skipLabel':'跳过',
      'doneLabel': '完成'
    }).start()
  })
}
```
