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
		user: {},
		token: localStorage.getItem('token')
	},

	mutations: {
		SET_CURRENT_USER(state, { token, user }) {
			state.user = user;
			state.token = token;
			localStorage.setItem('token', token);
		},
		LOGOUT_CURRENT_USER(state) {
			state.token = null;
		}
	},

	actions: {
		loadCurrentUserInfo({ commit, state }) {
			return new Promise((resolve, reject) => {

				const token = state.token;

				UserService
					.getUserInfo(token)
					.then(user => {
						commit('SET_CURRENT_USER', { token, user });
						resolve();
					})
					.catch(err => {
						console.log(err);
						reject();
					})
			})
		}
	},

	getters: {
		isLoggedIn(state) {
			return !!state.token;
		}
	}
})
