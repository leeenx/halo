/*
	@author:leeenx
	@查看商品预约人数
	@必传参数skuid
*/
halo.use('jsonp',function(m){
	//http://yushou.jd.com/youshouinfo.action?callback=yushouJDCB&sku=1326706&t=0.96812730724923310&g_ty=ls
	halo.add('querybooknum',function(skuid,cb){
		if(!skuid)return ;
		m.jsonp({
			url:'http://yushou.jd.com/youshouinfo.action',
			data:{
				sku:skuid,
				g_ty:"ls"
			},
			callback:function(json){
				var num=json.num;
				typeof(cb)=="function"&&cb(num,json);
			}
		});
	});
});