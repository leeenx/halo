/*
  @author:leeenx
  @解决华为3c下，png8长图的clearRect清屏的bug
*/
typeof(halo)!='undefined'&&halo.add('huawei3chack','hack');
!function(){
  var ua=navigator.userAgent.toLowerCase();
  if(ua.indexOf('android 4.0')||ua.indexOf('android 4.1')||ua.indexOf('android 4.2')||ua.indexOf('android 4.3')){
    //更改canvas的clearRect方法 - 除了3c对4.4以下的系统也都加了这个属性
    var clearRect=CanvasRenderingContext2D.prototype.clearRect,_w=.5,_h=0,_t;
    CanvasRenderingContext2D.prototype.clearRect=function(x,y,width,height){
      _t=_w,_w=_h,_h=_t;
      var w=this.canvas.width,h=this.canvas.height;
      if(w==width&&h==height)h-=_h,w-=_w;
      alert(h)
      clearRect.call(this,x,y,width-_w,height-_h);
    };
  }
}();