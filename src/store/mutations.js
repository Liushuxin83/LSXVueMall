import {ADD_CART} from './mutations-types'
export default {
    [ADD_CART](state, payload) {
        //1.查找之前的cartList数组中是否有该商品
        const product = state.cartList.find(item => item.iid === payload.iid);
        // console.log(product);
        if (product) {
            product.count += 1;
        } else {
            //如果cartList中没有改该商品，则为paylod里面穿过来的值添加一个count属性为1
            payload.count = 1;
						//根据对象模型中的checked属性来双向绑定单选框
						payload.checked = true;
            state.cartList.push(payload);
        }
    },
}