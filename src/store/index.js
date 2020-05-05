import Vue from 'vue'
import Vuex from 'vuex'
import UserService from '@/services/UserService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phases: {
      1: 'Cadastro Inicial',
      2: 'Avaliação Inicial',
      3: 'Cadastro Detalhado',
      4: 'Avaliação Detalhada',
      5: 'Reunião',
      6: 'Entrega'
    },
    user: {}
  },
  mutations: {
    addUserInfo(state, { user }) {
      state.user = user;
    }
  },
  actions: {
    loadUserInfo(context, { token }) {

      return UserService
        .getUserInfo(token)
        .then(user => {
          context.commit('addUserInfo', { user })
        });
    }
  },
  modules: {
  }
})
