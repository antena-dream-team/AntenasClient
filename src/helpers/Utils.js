import store from '../store/index'

export const getProjectStatus = project => {
    let isMeetingPhase = project.progress === 5;
    let hasMeeting = project.meeting.chosenDate != null;
    
    let isRefused = project.refused;
    let isDeliveryPhase = project.progress === 6;

    let isConcluded = (store.getters.isStudent && project.deliver.some(deliver => deliver.students.includes(store.state.user.id))) || 
        (!store.getters.isTeacher && isDeliveryPhase && project.teacher && project.studentResponsible && project.deliver.length);

    let isWaiting;

    if (store.getters.isRepresentative) {
        isWaiting = project.progress === 3 || (isMeetingPhase && !hasMeeting && project.meeting.possibleDate.length);
    }
    else if (store.getters.isCadi) {
        isWaiting = [2, 4].includes(project.progress) || (isMeetingPhase && !project.meeting.chosenDate) || (isDeliveryPhase && !project.teacher);
    }
    else if (store.getters.isTeacher) {
        isWaiting = !!isDeliveryPhase;
    }
    else if (store.getters.isStudent) {
        isWaiting = isDeliveryPhase && !project.deliver.some(entrega => entrega.students.includes(store.state.user.id));
    }

    if (isRefused) {
        return 'REFUSED';
    }
    else if (isConcluded) {
        return 'CONCLUDED';
    }
    else if (isWaiting) {
        return 'WAITING';
    }
    else {
        return 'PENDING';
    }
};

export const updateProject = (project, projectChanged) => {
    project.title = projectChanged.title;
    project.shortDescription = projectChanged.shortDescription;
    project.completeDescription = projectChanged.completeDescription;
    project.technologyDescription = projectChanged.technologyDescription;
    project.lastUpdate = projectChanged.lastUpdate;
    project.progress = projectChanged.progress;
    project.notes = projectChanged.notes;
    project.meeting.chosenDate = projectChanged.meeting.chosenDate;
    project.meeting.possibleDate = projectChanged.meeting.possibleDate;
    project.meeting.address.place = projectChanged.meeting.address.place;
    project.meeting.address.number = projectChanged.meeting.address.number;
    project.meeting.address.city = projectChanged.meeting.address.city;
    project.meeting.address.zip = projectChanged.meeting.address.zip;
    project.teacher = projectChanged.teacher;
    project.students = projectChanged.students;
    project.deliver = projectChanged.deliver;
    project.studentResponsible = projectChanged.studentResponsible;
};

export default { getProjectStatus, updateProject };