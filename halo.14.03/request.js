halo.add("request",function(){var a=window.location.href,b=a.indexOf("?")+1,c=a.indexOf("#")>-1?a.indexOf("#"):a.length,d=a.substring(b,c),e=d.split("&"),f={};if(d!=a)for(i in e){var g=e[i].split("=");f[g[0]]=g[1]||""}return function(a){return"string"==typeof a?f[a]:f}}());