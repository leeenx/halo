/*
	@author: leeenx
	@记录下页面跳转前的scroll位置
*/
halo.use(function(m){
	halo.add('remember',function(){
		if(!m.cookie)throw('remember module expect cookie,please use cookie!');
		var cookie_name=m.md5?'st_'+m.md5(window.location.href):'st';//有md5加密可以同域名多页面记位置而不产生干扰
		window.onunload=function(){
			//刷新页面前记住位置
			var _st=document.body.scrollTop;
			m.cookie.set(cookie_name,_st);
		};
		var st=parseInt(m.cookie.get(cookie_name))||0;
		if(st){
			var tmp=document.createElement('div');//定位元素，防止加载未完成而无法正确定位
			var ch=document.documentElement.clientHeight||document.body.clientHeight;
			tmp.style.cssText='position:absolute; width:1px; height:1px; left:1px; top:'+(st+ch-1)+'px;';
			document.body.appendChild(tmp);
		}
		//window.scroll(0,st);
		document.body.scrollTop=st;
		m.cookie.del(cookie_name);//定位后删除cookie
	}());
});