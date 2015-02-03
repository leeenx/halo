halo.use(function(m){
	var config={},_config={link:'',img_url:'',desc:'',title:'',img_width:80,img_height:80,appid:''};//分享参数对象
	function afterDomLoaded(){//DomContentLoaded完成后再执行此方法
		if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
			init();
		} else {
			if (document.addEventListener) {
				document.addEventListener("WeixinJSBridgeReady", init, false);
			} else if (document.attachEvent) {
				document.attachEvent("WeixinJSBridgeReady", init);
				document.attachEvent("onWeixinJSBridgeReady", init);
			}
		}
	}
	if("complete"!=document.readyState){
		if('uninitialized'==document.readyState||'loading'==document.readyState||'loaded'==document.readyState||'interactive'==document.readyState||'complete'==document.readyState){
			//表示支持document.readyState的浏览器
			var chkComplete=function(){
				if("complete"!=document.readyState){
					var _arguments=arguments;
					setTimeout(function(){
						_arguments.callee();
					},300);
					return ;
				}
				afterDomLoaded();
			};
			if('interactive'==document.readyState)chkComplete();//如果是interactive就已经不会触发下的事件，直接进入检查readyState状态
			document.addEventListener('DOMContentLoaded',function(){//此时是interactive
				chkComplete();
			});
		}else{
			//不支持document.readyState的浏览器
			!function(){
				setTimeout(function(){
					afterDomLoaded();
				},1000);//先1s后当是DOMContentLoaded执行
				var interval=setInterval(function(){
					if(--maxTime){
						init();
					}else{
						clearInterval(interval);
					}
				},5000),maxTime=10;//每隔5s执行一次，覆盖上一次的WeixinJSBridge.on，一共10次
			}();
			//setTimeout(function(){afterDomLoaded();},1000);//如果1s后还没有加载完成，就没有办法了
		}
	}else{//加载完成
		afterDomLoaded();
	}
	function init(){
		WeixinJSBridge.on("menu:share:appmessage", shareToFriend);// 监听事件 - 发给朋友
		WeixinJSBridge.on("menu:share:timeline", shareToFriends);// 监听事件 - 朋友圈	
	}
	function shareToFriend(){
		var arg={};
		for(var i in _config)arg[i]=config[i]||_config[i];
		arg.appid||(delete arg.appid);
		WeixinJSBridge.invoke("sendAppMessage", arg, function (res) {
			//alert(res.err_msg);
			afterShare(res.err_msg);
		});
	}
	function shareToFriends(){
		var arg={};
		for(var i in _config)arg[i]=config[i]||_config[i];
		arg.appid||(delete arg.appid);
		config.useTitle||(arg.title=config.desc);//朋友圈默认是用desc作title
		config.friendsDesc&&(arg.title=config.friendsDesc);//有frendsDesc时，用friendsDesc作为描述
		WeixinJSBridge.invoke("shareTimeline", arg, function (res) {
			afterShare(res.err_msg);
		});
	}
	function afterShare(err_msg){
		var ret=(err_msg.indexOf('ok')>=0||err_msg.indexOf('confirm')>=0)?'ok':(err_msg.indexOf('cancel')>=0?'cancel':'fail');
		typeof(config.cb)=='function'&&config.cb(ret);
	}
	halo.add('weixinshare',function(url,img,title,desc,width,height,appid){
		if(typeof(url)=='object'){
			//以对象形式传入参数
			config=url;
			config.img&&(config.img_url=config.img,delete config.img);
			config.url&&(config.link=config.url,delete config.url);
		}else if(typeof(url)=='string'){
			config={link:url,img_url:img||'',desc:desc||'',title:title||'',img_width:width||80,img_height:height||80};
			appid&&(config.appid=appid);
		}else{
			config=undefined;
			throw('url expect string type');
		}
		return config;
	});
});