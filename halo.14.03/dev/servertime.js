/*
	@author:leeenx
	@获取当前服务器的时间
*/
!function(){
	var servertime=new Date().toGMTString();//取不到服务时间就降级使用客户端的时间
	typeof(halo)!='undefined'?halo.add('servertime',servertime):(window.servertime=servertime);
	var xhr=window.ActiveXObject?new window.ActiveXObject('Microsoft.XMLHTTP'):new XMLHttpRequest();
	xhr.open("HEAD",location.href,true);
	xhr.onreadystatechange=function(){
	    if( xhr.readyState == 4 && xhr.status == 200 ){
	         servertime=xhr.getResponseHeader("Date");
	         window._servertime?(window._servertime=servertime):halo.use(function(m){m.servertime=servertime;});
	    }
	}
	xhr.send(null); 
}();