/*
	@author:leeenx
	@定制活动页面弹窗
*/
halo.use(function(m){
	halo.add('actbox',function(){
		var closer_img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABUklEQVQ4T53Vy0rDQBQG4Jwq2J32TQQtLejSqvgGBV9EELrquxS6raAounFRsC8jWegu/f9xIifTubZwyKTJfDlzOYk0TfNYVRXjHTEVkW8ci39wTtBpibhEzAR//KJxZKU1jreluEXf0PfMOjXhZ5zcqBSLcA9KakX4GI0XxKgUD6CfcO6E2D54FBWpDVyKp1B6/3AunoPuwCncJqJXn13+5hTDV2vUzTgxLRtcP0ScKsCLejNO4DqpIBqF1bRw6OdaRJt7/dodfnIqVNYDtFnqevi8/IWYxCq0syv0E7H6RF8RbZk6SZusg+XvhQMooQPEUD0hiO/AAdQsFKKH4LtlnMLdAvENv7P6tvyTuC7pJOpsxSjevoSy0Vycr81iNAsHzC11pRYjWlHungvM+RMz/sHNfduhCI1kbj5ND7iB8YG4j5Wpm61TUPwSLRAXiPkWKWPUU0rTXW8AAAAASUVORK5CYII=',
		check_img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAABFGc6jAAABKUlEQVQ4T2NkoBH4+/nz/3fVtQy/Ll5i4EtJZmCkhT0gS97kFTD8vnETbDwjFxf1LUK3BGQRh7UVdS3CZgmbvh6DSG839SzCZwkTNzcjVeKIkCXgeKI0MRBjCdiiT/MX/P88fyEDu4kxg2BjAwMzLw/RlhNrCdiip3aO/////g32GJu2NoNwfy9RlpFiCdiiNwVF/3+cPAUPQWIs+/vp0/83+YXwfAJ2JDR1gSIeW3Qw/v385f/bwiKGX1evEWUZOZbAEwOxlpFrCUqqI2QZJZZgJG9clgk1NTC8ra4hKU7Q4wkj4iCWFQPj7CpcLSMrKwMsZRIT8VgTAzZBbJbB1BFKXbgKAJyZE5tl5FpCsAgCWfa+rp7h59lzDOwW5gxC9bUMuPIJoaIMAHTo7HbR1h4GAAAAAElFTkSuQmCC';
		var mask=document.createElement('div'),box=document.createElement('div'),closer=document.createElement('div'),h1=document.createElement('h1'),history=document.createElement('div'),label=document.createElement('div'),text=document.createElement('div');
		m.on(box,'touchstart',function(e){e.stopPropagation();},false);
		m.on(box,'touchmove',function(e){e.stopPropagation();},false);
		m.on(box,'touchend',function(e){e.stopPropagation();},false);
		m.on(mask,'touchmove',function(e){e.preventDefault();},false);
		m.on(closer,'touchstart',function(e){hide();});
		//为checkbox添加样式
		m.stylesheet('.HALO_CHKBOX{display:none;}');
		m.stylesheet('.HALO_CHKBOX + .HALO_CHKBOX_SAPN{background-image:url('+check_img+'); background-position:-100px 3px;}');
		m.stylesheet('.HALO_CHKBOX:checked + .HALO_CHKBOX_SAPN{background-position:1px 3px;}');
		//为radio添加样式
		m.stylesheet('.HALO_RAD{display:none;}');
		m.stylesheet('.HALO_RAD + .HALO_RAD_SPAN{text-indent:-9999px;}');
		m.stylesheet('.HALO_RAD:checked + .HALO_RAD_SPAN{text-indent:0;}');
		var config={
			maskBackgroundColor:'rgba(0,0,0,.3)',//锁屏颜色
			backgroundColor:'#333333',//弹出提示窗口的背景颜色
			color:'#ffffff',//字体颜色
			borderRadius:3,//弹出提示窗口的圆角值
			inputColor:'#333333',//输入框字体颜色
			inputBackgroundColor:'#ffffff',//输入框背景颜色
			inputBorderWidth:0,//输入框的边框宽度
			inputBorderRadius:3,//输入框的边框圆角
			inputTextAlign:'left',//输入框的对齐颜色
			inputBorderColor:'transparent',//输入框背景颜色
			inputBorderStyle:'none',//输入框边框样式
			buttonColor:'#ffffff',//按钮字体颜色
			buttonBackgroundColor:'#e4393c', //按钮背景颜色
			buttonBorderRadius:3,//按钮圆角值
			checkBorderRadius:3,//复选框圆角值
			checkBorderWidth:0,//复选框边框宽度
			checkBorderStyle:'none',//复选框边框样式
			checkedColor:"#E4393C",//复选框选中颜色
			checkBorderColor:'transparent',//复选框边框颜色
			checkBackgroundColor:'#ffffff',//复选框背景颜色
			radioBorderRadius:7,//单选框圆角值
			radioBorderWidth:1,//单选框边框宽度
			radioBorderStyle:'solid',//单选框边框样式
			radioColor:"#E4393C",//单选框选中颜色
			radioBorderColor:'#E4393C',//单选框边框颜色
			radioBackgroundColor:'#ffffff',//单选框背景颜色
			closerColor:'#ffffff' //关闭按钮的颜色
		},
		imgColor={//记录图片的当前颜色
			closer:config.closerColor,
			checkbox:config.checkedColor
		},
		changeColor=function(){
			var canvas=document.createElement('canvas'),context=canvas.getContext('2d');
			//document.body.appendChild(canvas);
			return function(imgsrc,clr,cb){
				if(typeof(clr)=='string'&&clr.length==7||clr.length==4){
					var img=new Image();
					var r,g,b;
					if(7==clr.length){
						r=clr.substring(1,3),g=clr.substring(3,5),b=clr.substring(5,7);
					}else{
						r=clr.substring(1,2),g=clr.substring(2,3),b=clr.substring(3,4);
						r+=r,g+=g,b+=b;
					}
					//转成十进制
					r=parseInt('0x'+r),g=parseInt('0x'+g),b=parseInt('0x'+b);
					img.onload=function(){
						//需要加载成功后才可以操作图片
						canvas.width=img.width,canvas.height=img.height;
						context.drawImage(img,0,0,img.width,img.height);
						var p=context.getImageData(0,0,img.width,img.height);
						for(var i=0,len=p.data.length;i<len;i+=4){
							p.data[i]=r,p.data[i+1]=g,p.data[i+2]=b;
						}
						context.putImageData(p,0,0,0,0,img.width,img.height);
						var url=canvas.toDataURL("image/png");
						if(typeof(cb)=='function')cb(url);
					};
					img.src=imgsrc;
				}
			}
		}(),
		show=function(arg){
			if(typeof(arg)!='object')return ;
			var sh=document.body.scrollHeight||document.documentElement.scrollHeight,sw=document.body.scrollWidth||document.documentElement.scrollWidth,st=document.body.scrollTop,ch=document.documentElement.clientHeight,cw=document.documentElement.clientWidth,sl=document.body.scrollLeft;
			mask.style.cssText='position:absolute; width:'+sw+'px; height:'+sh+'px; top:0; left:0; background-color:'+config.maskBackgroundColor+'; '+m.webkit+'transition:opacity .3s linear; opacity:0; font-size:14px; line-height:20px; color:'+config.color+'; font-family:Helvetica,STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Arial; z-index:9;';
			box.style.cssText='position:absolute; width:200px; left:0; top:0; background-color:'+config.backgroundColor+'; border-radius:'+config.borderRadius+'px; padding:18px 20px;';
			document.body.appendChild(mask),mask.appendChild(box);
			box.innerHTML='';//清空
			if(!arg.hasOwnProperty('closer')||arg.closer){
				closer.style.cssText='position:absolute; width:11px; height:11px; overflow:hidden; background:url('+closer_img+') 0 0 no-repeat; top:13px; right:13px; background-size:100%;';
				if(imgColor.closer!=config.closerColor){
					imgColor.closer=config.closerColor;//记录下当前颜色
					//closer_img=changeColor(closer_img,config.closerColor);
					changeColor(closer_img,config.closerColor,function(imgsrc){
						closer_img=imgsrc;
						closer.style.backgroundImage='url('+closer_img+')';
					});
				}
				box.appendChild(closer);
			}
			if(arg.title){
				h1.style.cssText='padding:0 0 10px 0; margin:0; font-size:14px; height:16px; line-height:16px; font-weight:normal; overflow:hidden; text-align:center;';
				h1.innerHTML=arg.title
				box.appendChild(h1);
			}
			if(arg.label){
				label.innerHTML=arg.label;
				box.appendChild(label);
			}
			var inputs=[];
			if(arg.input&&arg.input.length>0){
				for(var i=0,len=arg.input.length;i<len;++i){
					var input=document.createElement('input');
					input.type='text';
					input.value=arg.input[i].text,input.style.cssText='width:190px; height:33px; border-radius:'+config.inputBorderRadius+'px; background-color:'+config.inputBackgroundColor+'; border:'+config.inputBorderWidth+'px '+config.inputBorderStyle+' '+config.inputBorderColor+'; text-align:'+config.inputTextAlign+'; padding:5px; outline:none; color:'+config.inputColor+'; font-size:14px; margin:5px auto;';
					input.setAttribute('placeholder',arg.input[i].placeHolder||'');
					box.appendChild(input);
					inputs.push(input);
					m.on(input,'touchstart',function(){show_his(this);},false);
					m.on(input,'blur',function(){hide_his(this);},false);
				}
			}
			var checkboxes=[];
			if(arg.checkbox&&arg.checkbox.length>0){
				var tmp_id='HALO_CHK_ID_'+new Date().getTime()+'_';
				if(imgColor.checkbox!=config.checkedColor){
					imgColor.checkbox=config.checkedColor;
					changeColor(check_img,config.checkedColor,function(imgsrc){
						check_img=imgsrc;
						//覆盖上面的样式
						m.stylesheet('.HALO_CHKBOX + .HALO_CHKBOX_SAPN{background-image:url('+check_img+'); background-position:-100px 3px;}');
					});
				};
				for(var i=0,len=arg.checkbox.length;i<len;++i){
					var labelforchk=document.createElement('label');
					labelforchk.style.cssText="display:block; margin:10px 0;",labelforchk.setAttribute('for',tmp_id+i);
					if(arg.checkbox[i].before){
						var before=document.createElement('span');
						before.innerHTML=arg.checkbox[i].before;
						before.style.cssText='display:inline-block; vertical-align:top; margin-right:8px;';
						labelforchk.appendChild(before);
					}
					if(arg.checkbox[i].type!='none'){
						var checkbox=document.createElement('input'),_checkbox=document.createElement('span');
						checkbox.type='checkbox',checkbox.className="HALO_CHKBOX",checkbox.id=tmp_id+i;
						_checkbox.className='HALO_CHKBOX_SAPN';
						_checkbox.style.cssText='display:inline-block; width:15px; height:15px; overflow:hide; vertical-align:top; margin-right:8px; border:'+config.checkBorderWidth+'px '+config.checkBorderStyle+' '+config.checkBorderColor+'; border-radius:'+config.checkBorderRadius+'px; position:relative; top:2px; overflow:hidden; background-color:'+config.checkBackgroundColor+'; background-repeat:no-repeat; background-size:13px 9px;';
						if('checkAll'==arg.checkbox[i].type){
							(function(checkbox){
								m.on(labelforchk,'click',function(){
									for(var i=1;i<checkboxes.length;++i){
										checkboxes[i].checked=checkbox.checked;
									}
								},false);
							}(checkbox));
						}
						if(arg.checkbox[i].checked){
							checkbox.checked=true;
						}
						labelforchk.appendChild(checkbox);
						labelforchk.appendChild(_checkbox);
						checkboxes.push(checkbox)
					}
					if(arg.checkbox[i].after){
						var after=document.createElement('span');
						after.innerHTML=arg.checkbox[i].after;
						after.style.cssText='display:inline-block; vertical-align:top;';
						labelforchk.appendChild(after);
					}
					box.appendChild(labelforchk);
				}
			}
			var radioes=[];
			if(arg.radio&&arg.radio.length>0){
				var tmp_id='HALO_RAD_ID_'+new Date().getTime()+'_';
				for(var i=0,len=arg.radio.length;i<len;++i){
					var labelforchk=document.createElement('label');
					labelforchk.style.cssText="display:block; margin:10px 0;",labelforchk.setAttribute('for',tmp_id+i);
					if(arg.radio[i].before){
						var before=document.createElement('span');
						before.innerHTML=arg.radio[i].before;
						before.style.cssText='display:inline-block; vertical-align:top; margin-right:8px;';
						labelforchk.appendChild(before);
					}
					if(arg.radio[i].type!='none'){
						var radio=document.createElement('input'),_radio=document.createElement('span'),_radioAfter=document.createElement('span');
						radio.type='radio',radio.className="HALO_RAD",radio.id=tmp_id+i,radio.name=tmp_id;
						_radio.className='HALO_RAD_SPAN';
						_radio.style.cssText='display:inline-block; width:12px; height:12px; overflow:hide; vertical-align:top; margin-right:8px; border:'+config.radioBorderWidth+'px '+config.radioBorderStyle+' '+config.radioBorderColor+'; border-radius:'+config.radioBorderRadius+'px; position:relative; top:2px; overflow:hidden; background-color:'+config.radioBackgroundColor+'; text-align:center;';
						_radioAfter.style.cssText='display:inline-block; position:relative; border-radius:4px; width:8px; height:8px; overflow:hidden; background-color:'+config.radioColor+'; top:-5px;';
						_radio.appendChild(_radioAfter);
						if('checkAll'==arg.radio[i].type){
							(function(radio){
								m.on(labelforchk,'click',function(){
									for(var i=1;i<radioes.length;++i){
										radioes[i].checked=radio.checked;
									}
								},false);
							}(radio));
						}
						if(arg.radio[i].checked){
							radio.checked=true;
						}
						labelforchk.appendChild(radio);
						labelforchk.appendChild(_radio);
						radioes.push(radio)
					}
					if(arg.radio[i].after){
						var after=document.createElement('span');
						after.innerHTML=arg.radio[i].after;
						after.style.cssText='display:inline-block; vertical-align:top;';
						labelforchk.appendChild(after);
					}
					box.appendChild(labelforchk);
				}
			}
			if(arg.text){
				text.innerHTML=arg.text;
				arg.title||(text.style.paddingTop='12px');
				box.appendChild(text);
			}
			if(arg.button&&arg.button.length>0){
				var btns=document.createElement('div');
				btns.style.cssText='text-align:center; margin:5px 0;';
				box.appendChild(btns);
				for(var i=0,len=arg.button.length;i<len;++i){
					var btn=document.createElement('input');
					btn.type='button';
					btn.value=arg.button[i].text,btn.style.cssText='width:auto; height:33px; line-height:33px; display:inline-block; background-color:'+(arg.button[i].bgcolor||config.buttonBackgroundColor)+'; border-radius:'+config.buttonBorderRadius+'px; outline:none; text-align:center; font-size:14px; color:'+(arg.button[i].color||config.buttonColor)+'; border:0px none; margin:0; padding:0 15px; '+(0!=i?'margin-left:10px;':'');
					(function(i){
						m.on(btn,'flick',function(e){
							e.preventDefault();
							e.stopPropagation();
							if(typeof(arg.button[i].cb)=="function"){
								var form=[],len=0,his_arr=[];
								for(var _i in inputs){
									his_arr[_i]=form[len++]=inputs[_i].value;
								}
								for(var _i in checkboxes){
									form[len++]=checkboxes[_i].checked;
								}
								for(var _i in radioes){
									form[len++]=radioes[_i].checked;
								}
								arg.button[i].cb.call({hide:function(cb){hide(cb,his_arr);}},form);
								
							}
							if(arg.button[i].close||!arg.button[i].hasOwnProperty('close'))hide();
						});
					}(i));
					btns.appendChild(btn);
				}
			}
			setTimeout(function(){
				box.style.top=st+(ch-box.offsetHeight)*.5+'px';
				box.style.left=sl+(cw-box.offsetWidth)*.5+'px';
				mask.style.opacity=1;
			},100);
		},hide=function(cb,his_arr){
			cb=typeof(cb)=='function'?cb:function(){};
			his_arr&&make_history(his_arr);//关闭窗口时记录下his_arr
			mask.style.opacity=0;
			setTimeout(function(){
				try{
					mask.parentNode.removeChild(mask);
					box.innerHTML='';//清空
					cb();
				}catch(e){}
			},300);
		},
		make_history=function(arr){
			if(!m.cookie)return ;//没有cookie方法即是默认没有历史记录
			var str='';
			//去重
			for(var i=0;i<arr.length;++i){
				if(''==arr[i]){
					arr.splice(i,1);continue;
				}
				for(var j=i+1;j<arr.length;++j){
					if(arr[i]==arr[j]){
						arr.splice(j,1);//删除重复项或空项
						break;
					}
				}
			}
			if(!arr.length)return ;
			for(var i=0;i<arr.length&&i<5;++i){
				str+=(0!=i?'|':'')+arr[i];
			}
			var his=m.cookie.get('HALO_INPUT_HIS')||'',his_arr=!!his?his.split('|'):[];
			//检查记录是否存在于cookie中
			for(var i=0;i<his_arr.length;++i){
				for(var j=0;j<arr.length;++j){
					if(his_arr[i]==arr[j]){
						his_arr.splice(i,1);break;
					}
				}
			}
			if(arr.length<5){
				for(var i=0;i<5-arr.length&&i<his_arr.length;++i){
					str+='|'+his_arr[i];
				}
			}
			m.cookie.set('HALO_INPUT_HIS',str);
		},
		show_his=function(dom){
			//展示历史记录
			var his=m.cookie.get('HALO_INPUT_HIS'),his_arr=!!his?his.split('|'):[],str='';
			if(his_arr.length==0)return ;
			var history_item_css='position:relative; padding:5px; color:'+config.inputColor+'; height:33px; line-height:33px; border-top:1px solid #D3D3D3;',top=dom.offsetTop+dom.offsetHeight-config.inputBorderRadius;
			history.style.cssText='width:200px; height:auto; background-color:'+config.inputBackgroundColor+'; position:absolute; left:50%; margin-left:-100px; top:'+top+'px; border-bottom-left-radius:'+config.inputBorderRadius+'px; border-bottom-right-radius:'+config.inputBorderRadius+'px;';
			for(var i=0;i<his_arr.length;++i){
				str+='<div style="'+history_item_css+'">'+his_arr[i]+'</div>';
			}
			str+='<div clear="Y" style="'+history_item_css+'color:#6388d4; text-align:center;">清空历史记录</div>';
			history.innerHTML=str;
			m.on(history,'flick',function(e){
				var toucher=e.changedTouches||e.targetTouches,target=toucher[0].target;
				'Y'==target.getAttribute('clear')?m.cookie.delete('HALO_INPUT_HIS'):(dom.value=target.innerHTML);
				m.off(history,'flick');
			});
			box.appendChild(history);
			his_interval=setInterval(function(){
				his_chk(his_arr,dom.value);
			},1000);
		},
		hide_his=function(){
			his_interval&&clearInterval(his_interval);
			setTimeout(function(){
				try{box.removeChild(history);}catch(e){};
			},300);
		},
		his_interval,
		his_chk=function(his_arr,val){
			var str='',history_item_css='position:relative; padding:5px; color:'+config.inputColor+'; height:33px; line-height:33px; border-top:1px solid #D3D3D3;';
			for(var i=0;i<his_arr.length;++i){
				his_arr[i].indexOf(val)==0&&(str+='<div style="'+history_item_css+'">'+his_arr[i]+'</div>');
			}
			str+='<div clear="Y" style="'+history_item_css+'color:#6388d4; text-align:center;">清空历史记录</div>';
			history.innerHTML=str;
		}
		,o={config:config,show:show,hide:hide};
		return o;
	}());
});