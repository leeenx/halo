/*
	@authro:leeenx
	@跨域白名单
*/
halo.add('xswhitelist',function (url){
  var list=['paipai.com','*.paipai.com','qian-duan-she-ji.us','*.qian-duan-she-ji.us','mingyou123.com','*.mingyou123.com','mm.wanggou.com','*.wanggou.com'];
  var _url=url.replace(/^https?\:\/\//,''),lastIndex=_url.indexOf('/'),host=_url.substring(0,lastIndex==-1?_url.lenght:lastIndex),ret;
  for(var i=0,len=list.length;i<len;++i){
    var _host=list[i];
    if(_host==host){
      ret=true;break;
    }else if(_host.indexOf('*')==0){//通配判断
      var reg=new RegExp('\\.'+_host.substring(2,_host.length).replace(/\./g,'\\.')+'$');
      if(reg.test(host)){
        ret=true;break;
      }
    }
  }
  return !!ret;
});