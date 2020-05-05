import axios from 'axios'

let users = [
    {
        name: 'Fábio Lucas Romeiro de Castro',
        email: 'flromeiroc@gmail.com',
        password: '123456',
        role: 'Aluno',
        token: 'qweyu2u948jeisdj'
    }
];

export default {

    authenticateUser(user) {
        return new Promise(resolve => {
            let currentUser = users.filter(usr => usr.email === user.email && usr.password === user.password)[0];
            resolve(currentUser && currentUser.token);
        });
    },

    registUser(user) {
        return new Promise(resolve => {
            users.push(user);
            resolve(user);
        });
    },

    getUserInfo(token) {
        return new Promise(resolve => {
            let user = users.filter(user => user.token === token)[0];
            
            resolve({
                name: user.name,
                email: user.email,
                token: user.token,
                role: user.role
            });
        });
    }
};