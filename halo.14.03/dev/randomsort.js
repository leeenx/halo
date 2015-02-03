/*
	@author:leeenx
	@将数组随机排序
*/
halo.add('randomsort',function(arr,arrLen){
	//将队列随机打乱
	if(arr.length<=0)return arr;
	arrLen=parseInt(arrLen)||0;
	var index_arr=[],new_arr=[],len=arr.length,index_arr_len=len;
	if(arrLen<=0)arrLen=len;
	for(var i=0;i<len;++i)index_arr[i]=i;//索引数组
	while(index_arr_len>0&&arrLen){
		var _rnd=parseInt(Math.random()*index_arr_len);
		new_arr[len-index_arr_len]=arr[index_arr.splice(_rnd,1)];
		--index_arr_len;
		--arrLen;
	}
	return new_arr;//生成新数组
});