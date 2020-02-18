let users = [
    {
        name: 'Fábio Lucas Romeiro de Castro',
        email: 'flromeiroc@gmail.com',
        password: '123456',
        role: 'Aluno'
    }
];

module.exports = {

    authenticateUser(user) {
        return new Promise(resolve => {
            let userExists = users.some(usr => usr.email === user.email && usr.password === user.password);
            resolve(userExists);
        });
    },

    registUser(user) {
        return new Promise(resolve => {
            users.push(user);
            resolve(user);
        });
    }
};