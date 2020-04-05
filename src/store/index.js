import Vue from 'vue'
import Vuex from 'vuex'

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
