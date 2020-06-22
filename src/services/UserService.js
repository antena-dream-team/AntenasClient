import http from '../helpers/Http'
import store from '../store/index'

let users = [
    {
        id: 1,
        name: 'Fábio Lucas Romeiro de Castro',
        email: 'flromeiroc@gmail.com',
        password: '123456',
        role: 'REPRESENTATIVE',
        token: 'qweyu2u948jeisdj'
    },
    {
        id: 2,
        name: 'Danielly Garcia Jardim',
        email: 'danny.jardim@gmail.com',
        password: '123456',
        role: 'CADI',
        token: 'mfoeirut034985klfd'
    },
    {
        id: 3,
        name: 'Mateus Machado de Souza',
        email: 'mm.souza@gmail.com',
        password: '123456',
        role: 'TEACHER',
        token: 'assvwrwe4524rer23'
    },
    {
        id: 4,
        name: 'Thiago Diaz',
        email: 'thiago.d@gmail.com',
        password: '123456',
        role: 'STUDENT',
        token: 'oqiwjenqpkodm823'
    },
    {
        id: 5,
        name: 'Giovanna Xavier',
        email: 'gio.x@gmail.com',
        password: '123456',
        role: 'STUDENT',
        token: 'dadaojwoeqw82031'
    }
];

export default {

    authenticateUser({ email, password }) {
        /*
        return http
            .post('/login', { email, password })
            .then(res => {
                store.commit('SET_CURRENT_USER', {
                    token: res.data.access_token,
                    user: res.data.user
                });
            });
        */
        return new Promise((resolve, reject) => {
            let currentUser = users.filter(user => user.email === email && user.password === password)[0];

            if (currentUser) {
                store.commit('SET_CURRENT_USER', {
                    token: currentUser.token,
                    user: currentUser
                });
                resolve();
            }
            else {
                reject();
            }
        });
    },

    registUser({ name, email, password, role }) {
        const user = { 
            name, 
            email, 
            password, 
            role, 
            token: 'aoeuidhnqowdnasl231',
            id: 76
        };

        /*
        return http.post('/signup', user);
        */

        return new Promise(resolve => {
            users.push(user);
            resolve();
        });
    },

    getUserInfo() {
        /*
        return http.get('/user')
            .then(res => res.data);
        */
        return new Promise(resolve => {
            let user = users.filter(user => user.token === store.state.token)[0];
            
            resolve({
                name: user.name,
                email: user.email,
                token: user.token,
                role: user.role
            });
        });
    },

    getTeacherUsers() {
        return new Promise(resolve => {
            resolve(users.filter(user => user.role === 'TEACHER'));
        })
    }
};