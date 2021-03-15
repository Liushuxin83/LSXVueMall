// 防抖函数
export function debounce(fnc, delay=100) {
	//形参：fac为函数，delay为延迟事件
	let timer = null;
	return function () {
		if (timer) {
			clearTimeout(timer);
		};
		timer = setTimeout(() => {
			fnc.apply();
		}, delay);
	};
}