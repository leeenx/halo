#hack组件#

将一些移动端的 hack 问题封闭成一个组件，直接引用即可以解决对应的 bug

##ios7weixin6hack##

解决 ios7 微信6.0 版本下 webview 高度的 bug，适用于轻 app 交互（即翻页组件一起使用）。  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome  
使用方法：引用即可，可以不依赖 halo.js 引用

```
halo.use('ios7weixin6hack',function(m){
    //这样就可以了
}
```

-----------------------------------------------------------------------

##mi3hack##

解决 mi3 长动画阻塞的 hack （也可以有其它型号的 android 机子也有这种 bug）。  
浏览器：android 2.3.x~4.x/ios6~7/pc chrome  
使用方法：引用即可，可以不依赖 halo.js 引用

```
halo.use('mi3hack',function(m){
  //这样就可以了
});
```

>mi3 下，长动画会造成阻塞。造成翻页后，第二次的动画要等待上一面的动画结束后才进入页面播放。

----------------------------------------------------------------------

##androidweixinfonthack##

解决安卓微信被用户调整字体大小后显示的bug。  
浏览器：android 微信的内置浏览器  
语法：m.androidweixinfonthack(base);

|参数说明	||
|:----|:----|
|base|可选，int,表示当前页面的root的font-size（以px为准），没有传就表示不是使用rem做页面，会自动降级成引导层。|

语法2：`m.androidweixinfonthack.always(ms);` 表示对页面进行实时监听字体情况。建议不开启监听，一是比较资源，二是开启后的意义不大。

|参数说明	||
|ms|可选，number，监听页面字体情况的频度，单位为ms。默认是2000ms；|

>使用前提：使用rem作为字体和行高的单位，并且html{font-size: 62.5%;}。如果不符合，可以使用组合的降级引导功能。

DEMO: [点击查看 androidweixinfonthack](http://jdc.jd.com/halo/demo/androidweixinfonthack.html)

----------------------------------------------------------------------

[点击查看说明目录](https://github.com/leeenx/halo/blob/master/manual.md)