/*
	@author:leeenx
	@paipai浮层登录
	@weixin登录
	@支持跨域登录
*/
halo.use(function(m){
	halo.add('paipailogin',function(){
		function getCookie(name) {
			var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
				val = document.cookie.match(reg);
			return val ? (val[2] ? unescape(val[2]) : "") : null;
		}
		var ua = navigator.userAgent.toLowerCase(),isWX = window.WeixinJSBridge;
		if(!isWX){isWX = ua.match(/micromessenger/)?true : false;}
		var status=function(){
			return (getCookie("wg_skey") && getCookie("wg_uin") || getCookie("p_skey") && getCookie("p_uin") || getCookie("skey") && getCookie("uin"))?true:false;
		}
		//以下是微信登录
		var wxlogin=function(){
			if('paipai.com'!=window.location.host&&window.location.host.indexOf('.paipai.com')<0){
				//非拍拍域名
				var ru='http://www.paipai.com/halo/paipai/wxlogin.html',jump=window.location.protocol+'//'+window.location.host+window.location.pathname.replace(/\/[^\/]*$/,'')+'/afterLogin.html',s=window.location.pathname,startIndex=s.lastIndexOf('/'),slen=s.length;//取得当前文件名
				s=s.substring(startIndex+1,slen);
			}else{
				var ru=window.location.protocol+'//'+window.location.host+window.location.pathname;
			}
			var para=m.request(),wxlogin_ts=parseInt(para['wxlogin_ts'])||0,ts=new Date().getTime();
			if(ts-wxlogin_ts<30000){
				//30s内的登录，就不再进行登录尝试
				alert('登录失败');
				return;
			}
			ru+='?wxlogin_ts='+ts;//登录时间戳
			typeof(s)=='string'&&(ru+='&s='+s);
			typeof(jump)=='string'&&(ru+='&ru='+encodeURIComponent(jump));
			for(var i in para){
				if('wxlogin_ts'==i||'s'==i)continue;
				ru+='&'+i+'='+para[i];
			}
			window.location.href = 'http://b.paipai.com/mlogin/tws64/m/wxv2/Login?appid=1&rurl=' + encodeURIComponent(ru);
		}
		//以下是拍拍登录
		var loginWrap=document.createElement('div');
		loginWrap.style.cssText='position:absolute; width:100%; height:100%; left:0; top:0; background-color:#fff; display:none;';
		try{document.domain='paipai.com'}catch(e){}
		if('paipai.com'==document.domain){
			//paipai.com域名下，可直接使用线上的中转页
			var ru='http://www.paipai.com/halo/paipai/afterLogin.html';
		}else{
			//跨域，需要使用自己建立的中转页面
			var ru=window.location.protocol+'//'+window.location.host+window.location.pathname.replace(/\/[^\/]*$/,'')+'/afterLogin.html';
		}
		ru=encodeURIComponent(ru);
		document.body.appendChild(loginWrap);
		var callback=function(){};
		halo.afterPaipaiLogin=function(skey,uin){
			loginWrap.style.display='none';
			callback(skey,uin);
			callback=function(){};//执行完成后注销回调函数
		}
		var paipailogin=function(cb){
			typeof(cb)=='function'&&(callback=cb);
			loginWrap.innerHTML='<iframe frameborder="0" scrolling="no" src="http://www.paipai.com/halo/paipai/login.html?v='+new Date().getTime()+'&ru='+ru+'" width="100%" height="100%"></iframe>';
			loginWrap.style.display='block';
		};
		//组合登录接口
		var login=function(cb){
			//强制保持 cookie 纯洁。
			m.cookie.del('skey'),m.cookie.del('wg_skey'),m.cookie.del('p_skey'),m.cookie.del('uin'),m.cookie.del('wg_uin'),m.cookie.del('p_uin');
			if('paipai'==login.type){
				paipailogin(cb);
			}else if('wx'==login.type){
				wxlogin();
			}else{
				//自动认别环境登录
				isWX?wxlogin():paipailogin(cb);
			}
		};
		login.isLogin=status;//获取登录状态
		return login;
	}());
});