import store from '../store/index'

export default {
    addProject(project) {
        project = {
            id: (Math.random() * 100) + 3,
            lastUpdate: new Date().getTime(),
            progress: 2,
            entrepreneur: store.state.user.id,
            refused: false,
            meeting: {
                address: {
                    place: '',
                    number: '',
                    street: '',
                    neighborhood: '',
                    city: '',
                    zip: ''
                },
                chosenDate: null,
                possibleDate: [],
            },
            teacher: null,
            students: [],
            deliver: [],
            studentResponsible: null,
            ...project
        };

        let projects = JSON.parse(localStorage.getItem('projects'));
        projects.push(project);

        localStorage.setItem('projects', JSON.stringify(projects));

        return project;
    },

    getProjects() {
        let projects = JSON.parse(localStorage.getItem('projects'));
        const userId = store.state.user.id;

        return projects.filter(project => {

            return (store.getters.isRepresentative && project.entrepreneur == userId) ||
                store.getters.isCadi ||
                (store.getters.isTeacher && project.teacher == userId) ||
                (store.getters.isStudent && (project.studentResponsible == userId || project.students.some(student => student == userId)));
        });
    },

    updateProject(project, approved) {
        let projects = JSON.parse(localStorage.getItem('projects'));
        let updatedProject;

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

                if (store.getters.isRepresentative && project.progress === 5) {
                    project.progress = 6;
                }

                projects[index] = updatedProject = project;
                break;
            }
        }

        localStorage.setItem('projects', JSON.stringify(projects));

        return updatedProject;
    },

    authUser(email, password) {
        let users = JSON.parse(localStorage.getItem('users'));
        return users.filter(user => user.email === email && user.password === password)[0];
    },

    addUser(user) {
        let users = JSON.parse(localStorage.getItem('users'));
        user = {
            id: Math.ceil((Math.random() * 100) + 3),
            name: user.name,
            email: user.email,
            password : user.password,
            token : Math.ceil((Math.random() * 1000) + 3),
            authorizations: [{ name: user.role }]
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        return {
            data: user
        };
    },

    getUser() {
        let users = JSON.parse(localStorage.getItem('users'));
        const userId = localStorage.getItem('USER_ID');
        const userRole = localStorage.getItem('USER_ROLE');
        const token = localStorage.getItem('token');

        const user = users.filter(user => user.id == userId)[0];

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
            role: userRole
        };
    },

    getTeachers() {
        return JSON.parse(localStorage.getItem('users'))
            .filter(user => user.authorizations[0].name === 'TEACHER')
            .map(teacher => ({
                id: teacher.id,
                email: teacher.email,
                name: teacher.name,
                role: teacher.authorizations[0].name
            }));
    },

    getStudents() {
        return JSON.parse(localStorage.getItem('users'))
            .filter(user => user.authorizations[0].name === 'STUDENT')
            .map(student => ({
                id: student.id,
                email: student.email,
                name: student.name,
                role: student.authorizations[0].name
            }));
    }
}