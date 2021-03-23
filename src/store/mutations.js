import { ADD_CART } from './mutations-types'
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
    setListData(state, payload) {
        state.dataList = payload;
    },
    //点击换一换 触发该事件
    changeData(state) {
        let index = Math.ceil(state.dataList.length / state.pageSize); //求总共有多少页
        if (state.pageNum == index) {
            //当页数增加到最大时，就要回到第一页
            state.pageNum = 0;
        }
        //每点击一次 ，页数会增加1
        state.pageNum++;
    },
}