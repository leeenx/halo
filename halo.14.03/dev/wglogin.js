/*
	@author:leeenx
	@wanggou浮层登录
	@weixin登录
	@支持跨域登录
	@QQ使用的是第三登录接口，第三方接口登录跳转使用了top.location.href，所以没有办法实现无刷新登录
*/
halo.use(function(m){
	halo.add('wglogin',function(){
		function getCookie(name) {
			var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
				val = document.cookie.match(reg);
			return val ? (val[2] ? unescape(val[2]) : "") : null;
		}
		var ua = navigator.userAgent.toLowerCase(),isWX = window.WeixinJSBridge;
		if(!isWX){isWX = ua.match(/micromessenger/)?true : false;}
		var status=function(){
			var _isLogin=(getCookie("wg_skey") && getCookie("wg_uin") || getCookie("p_skey") && getCookie("p_uin") || getCookie("skey") && getCookie("uin") || getCookie("wq_skey") && getCookie("wq_uin"))?true:false;
			var sid=getCookie('sid')||'';
			//return sid&&_isLogin;//目前不需要对sid进行强制判断
			return _isLogin;
		}
		//以下是微信登录
		var wxlogin=function(jd){
			if('wanggou.com'!=window.location.host&&window.location.host.indexOf('.wanggou.com')<0){
				//非wanggou域名
				var ru='http://mm.wanggou.com/halo/wxlogin.html',jump=window.location.protocol+'//'+window.location.host+window.location.pathname.replace(/\/[^\/]*$/,'')+'/afterLogin.html',s=window.location.pathname,startIndex=s.lastIndexOf('/'),slen=s.length;//取得当前文件名
					s=s.substring(startIndex+1,slen);
			}else{
				var ru=window.location.protocol+'//'+window.location.host+window.location.pathname;
			}
			var para=m.request(),wglogin_ts=parseInt(para['wglogin_ts'])||0,ts=new Date().getTime();
			if(ts-wglogin_ts<30000){
				//30s内的登录，就不再进行登录尝试
				alert('登录失败');
				return;
			}
			ru+='?wglogin_ts='+ts;//登录时间戳
			typeof(s)=='string'&&(ru+='&s='+s);
			typeof(jump)=='string'&&(ru+='&ru='+encodeURIComponent(jump));
			for(var i in para){
				if('wglogin_ts'==i||'s'==i)continue;
				ru+='&'+i+'='+para[i];
			}
			window.location.href = (jd?'http://wq.jd.com/mlogin/wxv3/login_BJ':'http://party.wanggou.com/tws64/m/wxv2/Login')+'?appid=1&rurl=' + encodeURIComponent(ru);
		};
		//以下是拍拍登录
		var wglogin=function(){
			if('wanggou.com'!=window.location.host&&window.location.host.indexOf('.wanggou.com')<0){
				//跨域，需要使用自己建立的中转页面
				var ru=window.location.protocol+'//'+window.location.host+window.location.pathname.replace(/\/[^\/]*$/,'')+'/afterLogin.html',s=window.location.pathname,startIndex=s.lastIndexOf('/'),slen=s.length;//取得当前文件名
				s=s.substring(startIndex+1,slen);
			}else{
				//wanggou.com域名下，直接跳回当前页
				var ru=window.location.protocol+'//'+window.location.host+window.location.pathname;
			}
			var para=m.request(),wglogin_ts=parseInt(para['wglogin_ts'])||0,ts=new Date().getTime();
			if(ts-wglogin_ts<30000){
				//30s内的登录，就不再进行登录尝试
				alert('登录失败');
				return;
			}
			ru+='?wglogin_ts='+ts;//登录时间戳
			typeof(s)=='string'&&(ru+='&s='+s);
			ru=encodeURIComponent(ru);
			//window.location.href='http://test.wanggou.com/201410/mm/login.html?v='+new Date().getTime()+'&ru='+ru;
			window.location.href='http://mm.wanggou.com/halo/login.html?v='+new Date().getTime()+'&ru='+ru;
		};
		//组合登录接口
		var login=function(jd){
			//jd表示jd环境登录 默认为true
			//如果传入jd=false表示使用旧登录接口
			jd=(typeof(jd)=='undefined'?true:jd);
			if('qq'==login.type){
				wglogin(jd);
			}else if('wx'==login.type){
				wxlogin(jd);
			}else{
				//自动认别环境登录
				isWX?wxlogin(jd):wglogin(jd);
			}
		};
		login.isLogin=status;//获取登录状态
		return login;
	}());
});