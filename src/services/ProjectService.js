let projects = [
    {
        id: 1,
        title: 'Patinete voador',
        short_description: 'Pensa num patinete que voa. É isto.',
        notes: 'Vai ser bem massa',
        lastUpdate: new Date().getTime(),
        progress: 2
    },
    {
        id: 2,
        title: 'Patins voador',
        short_description: 'É praticamente um jetpack pro seu pé.',
        complete_description: '',
        technology_description: '',
        notes: '',
        lastUpdate: new Date().getTime(),
        progress: 3    
    },
    {
        id: 3,
        title: 'Skate voador',
        short_description: 'É um skate que voa parça, top demais.',
        complete_description: 'Tipo um hoverboard, Back to the future stuff',
        notes: 'https://www.youtube.com/watch?v=TkyLnWm1iCs',
        lastUpdate: new Date().getTime(),
        progress: 4    
    },
    {
        id: 4,
        title: 'Carro voador',
        short_description: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        complete_description: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura. Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        technology_description: 'Um carro feito em react com graxa em pó.',
        lastUpdate: new Date().getTime(),
        progress: 5,
        meeting: null    
    },
    {
        id: 5,
        title: 'Bicicleta voadora',
        short_description: 'Uma bicicleta movida a gasolina renovavel a base de vento e cenoura',
        complete_description: 'Uma bicicleta movida a gasolina renovavel a base de vento e cenoura. Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        technology_description: 'Uma bicicleta feita em react com graxa em pó.',
        lastUpdate: new Date().getTime(),
        progress: 5,
        meeting: {
            id: 1,
            choosenDate: undefined,
            address: 'Rua José Cobra, 360',
            possibleDate: [
                { dateTime: '2020-07-03T00:00:00.000+0000' },
                { dateTime: '2020-06-03T00:00:00.000+0000' },
                { dateTime: '2020-05-03T00:00:00.000+0000' },
            ]
        }    
    },
    {
        id: 6,
        title: 'Mochila voadora',
        short_description: 'Uma mochila que voa',
        complete_description: 'Basicamente um jetpack',
        technology_description: 'Poeira intergalática',
        lastUpdate: new Date().getTime(),
        progress: 6,
        meeting: {
            id: 1,
            choosenDate: '2020-07-03T00:00:00.000+0000',
            address: 'Rua José Cobra, 360',
            possibleDate: [
                { dateTime: '2020-07-03T00:00:00.000+0000' },
                { dateTime: '2020-06-03T00:00:00.000+0000' },
                { dateTime: '2020-05-03T00:00:00.000+0000' },
            ]
        }
    },
    {
        id: 7,
        progress: 2,
        title: 'Avião voador',
        short_description: 'Avião de papel que voa pra caralho no ar e na terra',
        lastUpdate: new Date().getTime(),
        refused: true
    }
];

export default {

    getProjects() {
        return new Promise(resolve => {
            resolve(projects);
        });
    },

    addProject(project) {
        return new Promise(resolve => {
            project = {
                id: (Math.random() * 100) + 3,
                lastUpdate: new Date().getTime(),
                progress: 2,
                ...project
            };

            projects.push(project);
            resolve(project);
        });
    },

    updateProject(project) {
        return new Promise(resolve => {
            projects.some((curProject, index) => {
                if (curProject.id === project.id) {

                    if (project.progress === 3) {
                        project.progress = 4;
                    }

                    console.log(project)

                    projects[index] = project;
                    return true;
                }
            });

            resolve(project);
        });
    }
};