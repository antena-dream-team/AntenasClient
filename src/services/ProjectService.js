let projects = [
    {
        id: 1,
        title: 'Carro voador',
        short_description: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        complete_description: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura. Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        technology_description: 'Um carro feito em react com graxa em pó.',
        lastUpdate: new Date().getTime(),
        phase: 4,
        status: 'WAITING'
    },
    {
        id: 2,
        phase: 1,
        title: 'Avião voador',
        short_description: 'Avião de papel que voa pra caralho no ar e na terra',
        lastUpdate: new Date().getTime(),
        status: 'REFUSED'
    }
];

module.exports = {

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
                phase: 1,
                status: 'PENDING',
                ...project
            };

            projects.push(project);
            resolve(project);
        });
    }
};