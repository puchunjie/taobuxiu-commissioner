import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import VueLocalStorage from 'vue-ls';

Vue.use(VueLocalStorage);
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        authorization: Vue.ls.get('authorization_zy'),
        loginId: Vue.ls.get('loginId_zy'),
    },
    getters: {

    },
    mutations: {
        [types.LOGIN]: (state, payload) => {
            Vue.ls.set('authorization_zy', payload.authorization);
            Vue.ls.set('loginId_zy', payload.loginId);
            state.authorization = payload.authorization;
            state.loginId = payload.loginId;
        },
        [types.LOGOUT]: (state) => {
            Vue.ls.remove('authorization_zy');
            Vue.ls.remove('loginId_zy');
            state.authorization = undefined;
            state.loginId = undefined;
        },
        // [types.SET_USER_INFO]: (state, payload) => {
        //     state.user = payload.buserInfo;
        //     delete payload.buserInfo;
        //     state.base = payload;
        // },
        // [types.UPDATE_USER_INFO]: (state, payload) => {
        //     state.user = payload;
        // },
        // [types.UPDATE_PRO_INFO]: (state, payload) => {
        //     state.user.proInfo = payload;
        // },
        // [types.SET_NUMS]: (state, payload) => {
        //     state.nums = payload;
        // },
        // [types.UPDATE_NUMS]: (state) => {
        //     state.nums.historySell++;
        //     state.nums.todaySell++;
        // },
        // // 消息推送commit
        // [types.UPDATE_PUSH_MSG]: (state, payload) => {
        //     state.pushData = payload;
        // }
    }
})