halo.use(function(a){halo.add("remember",function(){if(!a.cookie)throw"remember module expect cookie,please use cookie!";var b=a.md5?"st_"+a.md5(window.location.href):"st";window.onunload=function(){var c=document.body.scrollTop;a.cookie.set(b,c)};var c=parseInt(a.cookie.get(b))||0;if(c){var d=document.createElement("div"),e=document.documentElement.clientHeight||document.body.clientHeight;d.style.cssText="position:absolute; width:1px; height:1px; left:1px; top:"+(c+e-1)+"px;",document.body.appendChild(d)}document.body.scrollTop=c,a.cookie.del(b)}())});