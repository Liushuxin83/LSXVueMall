import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //存储购物车中的商品  用来页面共享
        cartList: [],
				dataList:[],//点击换一换  中的数据
				pageNum:1,//第一页
				pageSize:4,//每页显示四条数据
    },
    mutations,
    actions,
		getters
})