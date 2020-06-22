import http from '../helpers/Http'
import store from '../store/index'
import projects from './Mocks.js'

export default {

    getProjects() {
        /* return http
                .get('/projects')
                .then(res => res.data);
        */
        return new Promise(resolve => {
            resolve(projects.filter(project => {
                const userId = store.state.user.id;

                return (store.getters.isRepresentative && project.entrepreneur === userId) ||
                    store.getters.isCadi ||
                    (store.getters.isTeacher && project.teacher === userId) ||
                    (store.getters.isStudent && (studentResponsible === userId || project.students.some(student => student.id === userId)));
            }));
        });
    },

    addProject(project) {
        return new Promise(resolve => {
            project = {
                id: (Math.random() * 100) + 3,
                lastUpdate: new Date().getTime(),
                progress: 2,
                entrepreneur: store.state.user.id,
                refused: false,
                address: {
                    place: '',
                    number: '',
                    street: '',
                    neighborhood: '',
                    city: '',
                    zip: ''
                },
                meeting: {
                    chosenDate: null,
                    possibleDate: [],
                },
                teacher: null,
                students: [],
                deliver: [],
                studentResponsible: null,
                ...project
            };

            projects.push(project);
            store.commit('ADD_PROJECTS', [project]);
            resolve(project);
        });
    },

    updateProject(project, approved) {
        return new Promise(resolve => {

            for (let index = 0; index < projects.length; index++) {
                
                if (projects[index].id === project.id) {
    
                    if (store.getters.isCadi && [2, 4].includes(project.progress)) {
                        project.refused = !approved;
    
                        if (approved) {
                            project.progress = project.progress + 1;
                        }
                        else {
                            store.commit('DESELECT_PROJECT');
                        }
                    }
    
                    if (store.getters.isRepresentative && project.progress === 3) {
                        project.progress = 4;
                    }
    
                    projects[index] = project;
                    break;
                }
            }
            
            store.commit('UPDATE_PROJECT', project);
            resolve(project);
        });
    }
};