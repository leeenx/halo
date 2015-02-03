/*
	@author:leeenx
	@手Q下的商品预约
	@支持单个商品和多个商品预约
	@以下是调用方法
	@m.qqgoodsbook(skulist,function(json){
		var ret=json.ret;
		//-1==ret 表示没缺少关键参数:subscriberesult
		//0==ret 表示单个商品预约成功
		//1==ret 表示单个商品预约失败
		//2==ret 表示商品列表预约返回一个list数组，代表各个商品的预约结果。list=[[skuid,result],[skuid,result],[skuid,result]...]；result与ret相同，0成功,1失败
	});
*/
halo.add('qqgoodsbook',function(){
    //这里的list=[[skuid,cosspresaleid,globalpresaleid,salestarttime],[skuid,cosspresaleid,globalpresaleid,salestarttime],...];
    var ifr=document.createElement('iframe');
    ifr.style.display="none";
    document.body.appendChild(ifr);
    var cbs=[];
    window.addEventListener('message',function(json){
        console.log(json);
        if(json.data.type=='qqgoodsbook'){
            //是qqgoodsbook的回调
            while(cbs.length){
                var cb=cbs.pop();
                typeof(cb)=='function'&&cb({ret:json.data.ret,list:json.data.list});
            }
        }
    });
    return function(list,cb){
        cbs.push(cb);
        var skulist='';
        for(var i=0,len=list.length;i<len;++i){
            if(i>0)skulist+=',';
            skulist+=list[i][0]+'!'+list[i][1]+'!'+list[i][2]+'!'+list[i][3];
        }
        ifr.src="http://bases.wanggou.com/presale/msubscribe?usersource=2&returl="+encodeURIComponent('http://mm.wanggou.com/halo/qqgoodsbook.html')+"&skulist="+skulist;
    }
}());