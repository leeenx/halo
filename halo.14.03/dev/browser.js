/*
	@author:leeenx
	@判断当前浏览器版本
*/
halo.add('browser',function(){
	var agent=function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webkit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iphone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			ipad: u.indexOf('iPad') > -1, //是否iPad
			webapp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin:u.indexOf('MicroMessenger')>-1,//微信环境
			qq:(/qq\/([\d\.]+)*/i).test(u)>-1//手Q环境
		};
     }(),
	 version=function(){
		/*版本号,只针对android*/
		var u = navigator.userAgent,matchIndex=u.indexOf('Android');
		if(matchIndex>-1){
			var num=u.substring(matchIndex+7,matchIndex+11).replace(/[^0-9\.]/g,'');
			return parseFloat(num);
		}
		return '';
	 }();
	 return function(a){
	 	if(typeof(a)=='string'){
	 		a=a.toLowerCase();
	 		if('ie'==a)a='trident';
	 		else if('opera'==a)a='presto';
	 		else if('firefox'==a)a='gecko';
	 		if(agent.hasOwnProperty(a)){
	 			if('android'==a&&agent[a]){
	 				return version;
	 			}else{
	 				return agent[a];
	 			}
	 		}
	 	}else{
	 		return ;
	 	}
	 };
}());