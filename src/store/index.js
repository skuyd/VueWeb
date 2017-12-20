import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    // count = 0,
    baseUrl: '/api',
    token: null
};
const mutations = {

    modifyToken(state, token) {
        state.token = token;
    },
    modifybaseUrl(state, baseUrl) {
        state.baseUrl = baseUrl;
    }
}

const getters = {
    token: function(state) {
        return state.token;
    },
    baseUrl: function(state) {
        return state.baseUrl;
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters
});