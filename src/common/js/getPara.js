export function getUrlPara(){
	let para=window.location.search;
	let reg=/[?&][^?&]+=[^?&]+/g;
	let check=para.match(reg);
	let obj={};
	if(check){
		check.forEach((item)=>{
			let actual=item.substring(1).split("=");
			let key=decodeURIComponent(actual[0]);
			let value=decodeURIComponent(actual[1]);
			obj[key]=value
		})
	}
	return obj;
}