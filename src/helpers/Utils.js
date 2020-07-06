import store from '../store/index'

export const getProjectStatus = project => {
    let isMeetingPhase = project.progress === 5;
    let hasMeeting;

    if (project.hasMeeting == null) {
        hasMeeting = false;
    } else {
        hasMeeting = project.meeting.chosenDate != null;
    }
    
    let isRefused = project.refused;
    let isDeliveryPhase = project.progress === 6;

    let isConcluded = isDeliveryPhase && project.teacher && project.studentResponsible && project.deliver.length;

    let isWaiting;

    if (store.getters.isRepresentative) {
        isWaiting = project.progress === 3 || (isMeetingPhase && !hasMeeting && project.meeting.possibleDate);
    }
    else if (store.getters.isCadi) {
        isWaiting = [2, 4].includes(project.progress) || (isMeetingPhase && !project.meeting.chosenDate) || (isDeliveryPhase && !project.teacher);
    }
    else if (store.getters.isTeacher) {
        isWaiting = isDeliveryPhase && !project.studentResponsible;
    }
    else if (store.getters.isStudent && project.studentResponsible === store.state.user.id) {
        isWaiting = isDeliveryPhase && !project.deliver.some(entrega => entrega.studentResponsible === project.studentResponsible);
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

    if (projectChanged.meeting != null) {
        project.meeting.chosenDate = projectChanged.meeting.chosenDate;
        project.meeting.possibleDate = projectChanged.meeting.possibleDate;
        project.meeting.address.place = projectChanged.meeting.address.place;
        project.meeting.address.number = projectChanged.meeting.address.number;
        project.meeting.address.city = projectChanged.meeting.address.city;
        project.meeting.address.zip = projectChanged.meeting.address.zip;
    } else {
        project.meeting.chosenDate = null;
        project.meeting.possibleDate = null;
        project.meeting.address.place = null;
        project.meeting.address.number = null;
        project.meeting.address.city = null;
        project.meeting.address.zip = null;
    }

    if (projectChanged.teacher != null) {
        project.teacher = projectChanged.teacher;
    } else {
        project.teacher = NULL;
    }

    if (projectChanged.students != null) {
        project.students = projectChanged.students;
    } else {
        project.students = null;
    }
    project.deliver = projectChanged.deliver;
    project.studentResponsible = projectChanged.studentResponsible;
};

export default { getProjectStatus, updateProject };