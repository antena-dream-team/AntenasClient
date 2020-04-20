export default {
    getProjectStatus(project) {
        let isMeetingPhase = project.progress === 5;
        let hasMeeting = project.meeting && project.meeting.choosenDate;
        
        let isRefused = project.refused;
        let isConcluded = project.progress === 6;
        let isWaiting = project.progress === 3 || (isMeetingPhase && !hasMeeting);

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
    }
};