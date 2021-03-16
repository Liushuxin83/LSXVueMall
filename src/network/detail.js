import { request } from '../network/request'
export function getDetailData(id) {
    return request({
        url: 'detail',
        params: {
            iid: id
        }
    })
}

export function getRecommendInfo(){
	return request({
		url:'recommend'
	})
}
//由于后端返回的数据太杂，需要把自己需要的数据抽离成一个对象
export class GoodsBaseInfo {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.price = itemInfo.price;
				this.desc = itemInfo.desc;
				this.newPrice = itemInfo.lowNowPrice;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
    }
}


// 例子：（es6中使用类）
// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }
// const p = new Person('lsx',10)
// console.log(p.name);