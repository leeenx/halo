/*
	@author:leeenx
	@作用：模拟asp的request方法
*/
halo.add('request',function()
{
	var lhref=window.location.href,startindex=lhref.indexOf("?")+1,endindex=lhref.indexOf('#')>-1?lhref.indexOf('#'):lhref.length,parameters=lhref.substring(startindex,endindex),keyvalue=parameters.split("&"),requestPara={};
	if(parameters!=lhref){
		for(i in keyvalue)
		{
			var key=keyvalue[i].split("=");
			requestPara[key[0]]=key[1]||'';
		}
	}
	return function(name){
		if(typeof(name)=='string')
			return requestPara[name];
		else
			return requestPara;
	};
}());