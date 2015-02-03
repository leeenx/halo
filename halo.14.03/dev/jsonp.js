/*
	author:leeenx
	功能：实现jsonp方法
	扩展：可以识别文件类型的错误，当作parseerror处理
*/
halo.use(function(){
	var jsonp=function(arg){
		var script=document.createElement("script"),hasLoaded=false,typeErr=true,isTimeout=false;
		script.type='text/javascript';
		script.onload=function(){
			if(isTimeout)return;//表示已经执行过abort操作了
			hasLoaded=true;
			try{document.head.removeChild(script);}catch(e){}
			setTimeout(function(){
				typeErr&&abort('parseerror');//格式不正确
			},100);
		}
		var parameter='_='+new Date().getTime();
		if(typeof(arg.data)=='object'){
			for(var i in arg.data){
				parameter+='&'+i+'='+arg.data[i];
			}
		}
		arg.jsonp=typeof(arg.jsonp)=='string'?arg.jsonp:'callback';
		arg.jsonpCallback=typeof(arg.jsonpCallback)=='string'?arg.jsonpCallback:'HALO_'+(++jr)+new Date().getTime();
		parameter+='&'+arg.jsonp+'='+arg.jsonpCallback;
		typeof(arg.callback)!='function'&&(arg.callback=function(){});
		var callback=function(json){
			if(isTimeout)return;//表示已经执行过abort操作了，不再回调函数了
			typeErr=false;//能成功回调，表示jsonp的格式正确
			arg.callback(json);
		};
		eval(arg.jsonpCallback+'=callback;');
		var url=arg.url;
		url+=(url.indexOf('?')<0?'?':'&')+parameter;
		script.src=url;
		var abort=function(err){
			err=err||'abort';
			eval(arg.jsonpCallback+'("'+err+'");');
			try{document.head.removeChild(script);}catch(e){}
		};
		timeout=parseInt(arg.timeout);
		isNaN(timeout)||setTimeout(function(){hasLoaded||abort();isTimeout=true;},timeout);
		document.head.appendChild(script);
		//document.head.removeChild(script);
		var o={};
		o.abort=abort;
		return o;
	},jr=0;
	halo.add('jsonp',jsonp);
});