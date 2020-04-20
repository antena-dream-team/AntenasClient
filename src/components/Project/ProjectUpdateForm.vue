<template>
    <form @submit.prevent="submit()" class="project-update-form">
        <h5 class="project-update-form__title">
            Atualize as informações do seu projeto para prosseguir:
        </h5>

        <fieldset class="project-update-form__section" v-if="projectModel.progress === 3">
            <CustomInput
                class="project-update-form__field"
                label="Descrição completa" 
                v-model="projectModel.complete_description" 
            />
            <CustomInput
                class="project-update-form__field"
                label="Descrição da técnologia" 
                v-model="projectModel.technology_description" 
            />
        </fieldset>

        <fieldset class="project-update-form__section" v-if="projectModel.progress === 5">
            <CustomSelect
                class="project-update-form__field"
                label="Data da reunião" 
                v-model="projectModel.meeting.choosenDate"
                :options="getMeetingOptions()"
            />
        </fieldset>

        <fieldset class="project-update-form__section">
            <CustomButton :disabled="!isValid()">
                Enviar atualização
            </CustomButton>
        </fieldset>
    </form>
</template>

<script>
import EventBus from '@/helpers/EventBus.js'
import ProjectService from '@/services/ProjectService.js';
import CustomInput from '@/components/Forms/CustomInput.vue'
import CustomButton from '@/components/Forms/CustomButton.vue'
import CustomSelect from '@/components/Forms/CustomSelect.vue'

export default {
    name: 'ProjectUpdateForm',
    props: {
        project: Object
    },
    components: {
        CustomInput,
        CustomButton,
        CustomSelect,
    },
    computed: {
        projectModel() {
            return this.project;
        }
    },
    methods: {
        getMeetingOptions() {
            return this.projectModel.meeting.possibleDate
                .map(option => option.dateTime);
        },
        isValid() {
            let project = this.projectModel;
            return {
                3: project.complete_description && project.technology_description,
                5: project.meeting && project.meeting.choosenDate,
            }[project.progress];
        },
        submit() {
            ProjectService
                .updateProject(this.projectModel)
                .then(updatedProject => {
                    EventBus.$emit('UPDATE-PROJECT', updatedProject);
                });
        }
    },
    data() {
        return {};
    }
}
</script>

<style lang="scss" scoped>
    .project-update-form {
        background-color: $color-blue-extra-light;
        border: solid 1px $color-blue-light;
        padding: spacing(1);
        border-radius: 3px;

        &__title {
            font-weight: $font-weight-semibold;
            margin-bottom: spacing(2);
            color: $color-blue;
        }

        &__section {
            margin-bottom: spacing(2);
        }

        &__field {
            margin-bottom: spacing(1);
        }

        &__section,
        &__field {

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>