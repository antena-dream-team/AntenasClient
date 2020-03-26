<template>
    <div class="project-creation">
        <div class="box project-creation__project">
            <div class="box__header">
                <h4 class="title">Criar novo projeto</h4>
                <a href @click.prevent="closeCreation()" class="close">
                    <i class="material-icons">close</i>
                </a>
            </div>
            <div class="box__body project-body">
                <form @submit.prevent="submitProject">
                    
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/Forms/CustomButton.vue'
import ProjectStatus from '@/components/Project/ProjectStatus.vue'

export default {
    name: 'ProjectView',
    props: {
        project: Object
    },
	components: {
        CustomButton,
        ProjectStatus,
    },
    methods: {
        closeCreation() {
            this.$emit('close');
        },
        submitProject() {
            ProjectStatus
                .addProject(this.project)
                .then(project => {
                    this.$emit('select', project);
                    this.closeCreation();
                });
        }
    },
	data() {
		return {
            project: {

            }
        };
	}
}
</script>

<style scoped lang="scss">
.project-creation {

}
</style>
