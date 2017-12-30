export function saveLocal(id,key,value){
	let local=window.localStorage.__seller__;
	if(!local){
		local={};
		local[id]={};
	}else{
		local=JSON.parse(local);
		if(!local[id]){
			local[id]={}
		}
	}
	local[id][key]=value;
	window.localStorage.__seller__=JSON.stringify(local)
}

export function loadLocal(id,key,def){
	let local=window.localStorage.__seller__;
	if(!local){
		return def;
	}
	local=JSON.parse(local)[id];
	if(!local){
		return def;
	}
	let act=local[key];
	return act||def;
}