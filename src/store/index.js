import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    phases: [
      'Cadastro Inicial',
      'Avaliação Inicial',
      'Cadastro Detalhado',
      'Avaliação Detalhada',
      'Reunião',
      'Entrega'
    ],
    projects: []
  },
  mutations: {
    addProject(project) {
      state.projects.push(project);
    }
  },
  actions: {
  },
  modules: {
  }
})
