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
    },
    mutations,
    actions,
		getters
})