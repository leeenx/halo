halo.use(function(m){
    
    var event = (function(){
        var _EventList = {};

        var bind = function( name, fn, scope){
            if(typeof scope == 'object'){
            	if(!scope['event']){
            		scope['event'] = {};         		
            	}
            	if(!scope['event'][name]){
            		scope['event'][name] = [];
            	}
            	scope['event'][name].push(fn);
            	return;
            }
            if(!_EventList[name]){
                _EventList[name] = [];
            }
            _EventList[name].push(fn);
        }

        var trigger = function(name, scope, args){
            var _list = _EventList[name];
            if(scope['event'] && scope['event'][name]){
            	_list = scope['event'][name];
            }
            if(_list == undefined) return;
            for (var i = 0; i < _list.length; i++) {
                _list[i].call(scope,  args || {});
            };
        }

        return {
            bind:bind,
            trigger:trigger
        }

    })();

    halo.add('event',event);

});