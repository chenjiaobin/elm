# elm

> 这是一个仿饿了么webApp

## 这个webApp用到的技术
1、vue2.0相关语法以及
2、脚手架工具的使用
3、webpack
4、stylus的使用
5、对项目的框架结构的搭建
6、单页面应用
7、路由
8、better-scroll的使用
9、mock数据
## 使用这个项目的说明
# 安装依赖
> npm install

# 执行package.json的指令进行打包
> npm run dev

# 发布命令
> npm run build

# build for production and view the bundle analyzer report
npm run build --report

**注意：**
1、因为我这个是通过travis进行持续集成的，所以对于静态文件的应用被我更改了,在config文件夹里面的index.js文件里面的assetsSubDirectory路径和assetsPublicPath路径更改成`./static和./`,如果在本地找不到静态文件的话，那你就去这个文件里面将这两个路径前面的点去掉
```
//在线
assetsSubDirectory: './static',
assetsPublicPath: './',
```
```
//开发环境
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
```
2、我这个项目在线上是使用easy-mock的数据的，当然我在项目里面也有本地json文件，里面的数据也是可以用的，数据访问路径也是配置好了,就在/build/dev-server.js里面
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
开发环境的路径请求,这个是请求我在本地的json文件的数据
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
线上的路径请求，这个请求的数据是我在easy-mock上配置好的数据
```
created(){
     this.$http.get('https://www.easy-mock.com/mock/5a2d323b73225d015a529609/chenjiaobin/seller').then( (response) =>{
      response=response.body;
        // this.sellers=response.data;
        this.sellers=Object.assign({},this.sellers,response.seller);
    })
  }
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
