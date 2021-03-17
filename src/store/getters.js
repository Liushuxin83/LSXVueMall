export default {
    //计算cartList数组的长度，即购物车中商品的数量s
    cartListLength(state) {
        return state.cartList.length
    },
    //计算被选中的商品的数量
    checkedCount(state) {
        //声明变量必须用let
        let checkedCount = 0;
        state.cartList.forEach((item) => {
            if (item.checked) {
                checkedCount = item.count + checkedCount;
            }
        });
        return checkedCount
    },
    //计算被选中的商品的总价格
    checkedTotalPrice(state) {
        let checkedTotalPrice = 0;
        state.cartList.forEach(item => {
            if (item.checked) {
                checkedTotalPrice = item.price * item.count + checkedTotalPrice;
            }
        });
        return checkedTotalPrice*100
    }
}