import http from '../helpers/Http'
import store from '../store/index'
import Mocker from './Mocker.js';


const routeMap = {
    'STUDENT': '/student',
    'CADI': '/cadi',
    'REPRESENTATIVE': '/entrepreneur',
    'TEACHER': '/teacher'
};

export default {

    authenticateUser({ email, password }) {
        return new Promise((resolve, reject) => {
            let user = Mocker.authUser(email, password);

            if (!user) {
                reject();
                return;
            }

            localStorage.setItem('USER_ID', user.id);
            localStorage.setItem('USER_ROLE', user.authorizations[0].name);
            store.commit('SET_CURRENT_USER', {
                token: user.token,
                user: {
                    name: user.name,
                    role: user.authorizations[0].name,
                    email: user.email,
                    id: user.id
                }
            });

            resolve();
            return;
        });
    },

    registUser({ name, email, password, role }) {
        const user = { 
            name, 
            email, 
            password, 
            role
        };
        
        return new Promise((resolve, reject) => {
            resolve(Mocker.addUser(user));
        });
    },

    getUserInfo() {
        return new Promise((resolve, reject) => {
            resolve(Mocker.getUser());
        });
    },

    getTeacherUsers() {

        return new Promise((resolve, reject) => {
            resolve(Mocker.getTeachers());
        })
    },

    getStudentsUsers() {

        return new Promise((resolve, reject) => {
            resolve(Mocker.getStudents());
        });
    }
};