import http from '../helpers/Http'
import store from '../store/index'
import Mocker from './Mocker.js'

export default {

    getProjects() {
        return new Promise(resolve => {
            resolve(Mocker.getProjects());
        });
    },

    addProject(project) {
        return new Promise(resolve => {
            project = Mocker.addProject(project);
            store.commit('ADD_PROJECTS', [project]);
            resolve(project);
        });
    },

    updateProject(project, approved) {
        return new Promise(resolve => {
            project = Mocker.updateProject(project, approved);
            store.commit('UPDATE_PROJECT', project);
            resolve(project);
        });
    }
};