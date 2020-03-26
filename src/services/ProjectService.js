let projects = [
    {
        id: 0,
        title: 'Carro voador',
        shortDescription: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        description: 'Um carro eletrico movido a gasolina renovavel a base de vento e cenoura. Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura Um carro eletrico movido a gasolina renovavel a base de vento e cenoura',
        techDescription: 'Um carro feito em react com graxa em pó.',
        externalLink1: 'https://google.com.br',
        externalLink2: 'https://google.com.br',
        lastUpdate: new Date().getTime(),
        phase: 4,
        status: 'WAITING'
    },
    {
        id: 1,
        phase: 1,
        title: 'Avião voador',
        shortDescription: 'Avião de papel que voa pra caralho no ar e na terra',
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
            projects.push(project);
            resolve(project);
        });
    }
};