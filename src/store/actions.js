import data from '../mock/data.json'
export default {
    getListData({ commit }) {
        commit('setListData', data)
    }
}