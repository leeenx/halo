/*
	@author:leeenx
	@将图片变成灰度图片
*/
halo.add('togray',function(){
	var canvas=document.createElement('canvas'),context=canvas.getContext('2d');
	return function(src,cb){
		if(!src)return ;
		var img=new Image();
		img.onload=function(){
			canvas.width=img.width,canvas.height=img.height;
			context.drawImage(img,0,0,canvas.width,canvas.height);
			var pixel=context.getImageData(0,0,canvas.width,canvas.height);
			for(var i=0,len=pixel.data.length;i<len;i+=4){
				var r=pixel.data[i],g=pixel.data[i+1],b=pixel.data[i+2];
				pixel.data[i]=pixel.data[i+1]=pixel.data[i+2]=(r+g+b)/3;
			}
			context.putImageData(pixel,0,0);
			if(typeof(cb)=='function')cb(canvas.toDataURL());
		};
		img.src=src;
		img.onabort=img.onerror=function(){//返回空白图片
			return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=';
		};
	}
}());