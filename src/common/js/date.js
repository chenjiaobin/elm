export function formatDate(date,fmt){
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
	}
	let k={
		'M+':date.getMonth()+1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds()
	};
	for(let h in k){
		if(new RegExp(`(${h})`).test(fmt)){
			let str=k[h]+'';
			fmt=fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padZexo(str));
		}
	}
	return fmt;
};

function padZexo(str){
	return ('00'+str).substr(str.length);
}