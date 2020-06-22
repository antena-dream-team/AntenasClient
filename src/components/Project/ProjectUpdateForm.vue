<template>
    <form @submit.prevent="submit()" class="project-update-form">
        <h5 class="project-update-form__title">
            {{ getFormTitle() }}
        </h5>

        <fieldset class="project-update-form__section" v-if="updatedProject.progress === 3 && $store.getters.isRepresentative">
            <CustomInput
                class="project-update-form__field"
                label="Descrição completa" 
                v-model="updatedProject.completeDescription" 
            />
            <CustomInput
                class="project-update-form__field"
                label="Descrição da técnologia" 
                v-model="updatedProject.technologyDescription" 
            />
        </fieldset>

        <fieldset class="project-update-form__section" v-if="updatedProject.progress === 5 && $store.getters.isCadi && !updatedProject.meeting.choosenDate">
            <CustomInput
                class="project-update-form__field"
                label="Local da reunião - CEP" 
                v-model="updatedProject.meeting.address.zip"
            />
            <CustomInput
                class="project-update-form__field"
                label="Local da reunião - Cidade" 
                v-model="updatedProject.meeting.address.city"
            />
            <CustomInput
                class="project-update-form__field"
                label="Local da reunião - Rua" 
                v-model="updatedProject.meeting.address.street"
            />
            <CustomInput
                class="project-update-form__field"
                label="Local da reunião - Numero" 
                v-model="updatedProject.meeting.address.number"
            />

            <ul class="project-update-form__possible-dates" v-if="updatedProject.meeting.possibleDate.length">
                <span class="title">Datas possíveis cadastradas:</span>
                <li class="project-update-form__possible-date" v-for="possibleDate in updatedProject.meeting.possibleDate || []" :key="possibleDate.datetime">
                    {{ possibleDate.dateTime }}
                </li>
            </ul>

            <CustomInput
                class="project-update-form__field"
                label="Data da reunião Ex: 20/05/2020 14:30"
                v-model="newPossibleDate"
            />
            <CustomButton type="button" @click="addPossibleDate()" class="form-button">
                Adicionar possível data
            </CustomButton>
        </fieldset>

        <fieldset class="project-update-form__section" v-if="updatedProject.progress === 5 && $store.getters.isRepresentative && updatedProject.meeting.possibleDate">
            <CustomSelect
                class="project-update-form__field"
                label="Data da reunião" 
                v-model="updatedProject.meeting.choosenDate"
                :options="getMeetingOptions()"
            />
        </fieldset>

        <fieldset class="project-update-form__section" v-if="project.progress === 6 && $store.getters.isCadi">
            {{ updatedProject.teacher }}
            <CustomSelect
                class="project-update-form__field"
                label="Professor responsável" 
                v-model="selectedTeacher"
                :options="getTeachersOptions()"
            />
        </fieldset>

        <fieldset class="project-update-form__section">
            <CustomButton class="form-button" :disabled="!isValid()" v-if="!isToApproveOrDeny()">
                Enviar atualização
            </CustomButton>
            <CustomButton type="button" @click="submit(true)" class="form-button" v-if="isToApproveOrDeny()">
                Aprovar
            </CustomButton>
            <CustomButton type="button" @click="submit(false)" variant="red" class="form-button" v-if="isToApproveOrDeny()">
                Rejeitar
            </CustomButton>
        </fieldset>
    </form>
</template>

<script>
import EventBus from '@/helpers/EventBus.js'
import ProjectService from '@/services/ProjectService.js';
import UserService from '@/services/UserService.js';
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
    mounted() {
        UserService
            .getTeacherUsers()
            .then(teachers => this.teachers = teachers);
    },
    computed: {
        updatedProject() {
            return this.project;
        }
    },
    methods: {
        getFormTitle() {
            if (this.updated) {
                return 'Atualizações enviadas com sucesso!';
            }
            else if (this.$store.getters.isRepresentative) {
                return 'Atualize as informações do seu projeto para prosseguir:';
            }
            else if (this.$store.getters.isCadi && [2, 4].includes(this.project.progress)) {
                return 'Leia as especificações do projeto e decida se ele está apto a continuar:';
            }
            else if (this.$store.getters.isCadi && this.project.progress === 5) {
                return 'Escolha opções de datas para uma reunião com o representante do projeto:';
            }
            else if (this.$store.getters.isCadi && this.project.progress === 6) {
                return 'Escolha um professor cadastrado para ser o responsável por este projeto:';
            }
        },
        getMeetingOptions() {
            return this.updatedProject.meeting.possibleDate.map(option => option.dateTime);
        },
        getTeachersOptions() {
            return [null, ...this.teachers.map(teacher => teacher.name)];
        },
        isToApproveOrDeny() {
            return this.$store.getters.isCadi && [2, 4].includes(this.project.progress);
        },
        isValid() {
            let project = this.updatedProject;
            return {
                3: this.$store.getters.isRepresentative && project.completeDescription && project.technologyDescription,
                5: (this.$store.getters.isRepresentative && project.meeting.choosenDate) || (this.$store.getters.isCadi && project.meeting.possibleDate && project.meeting.possibleDate.length && project.meeting.address),
                6: (this.$store.getters.isCadi && this.selectedTeacher),
            }[project.progress];
        },
        addPossibleDate() {
            if (!this.updatedProject.meeting.possibleDate) {
                this.updatedProject.meeting.possibleDate = [];
            }

            let datetime = this.newPossibleDate.split(' ');
            let date = datetime[0].split('/');
            let time = datetime[1];

            let dateObject = new Date(`${date[1]}/${date[0]}/${date[2]} ${time}`);
            this.updatedProject.meeting.possibleDate.push({ dateTime: dateObject });
            this.newPossibleDate = '';
        },
        submit(approved) {
            this.updatedProject.teacher = this.teachers.filter(teacher => teacher.name === this.selectedTeacher)[0].id;
            ProjectService.updateProject(this.updatedProject, approved).then(() => {
                this.updated = true;
                setTimeout(() => this.updated = false, 5000);
            });
        }
    },
    data() {
        return {
            newPossibleDate: '',
            updated: false,
            teachers: [],
            selectedTeacher: null
        };
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

        &__possible-dates {
            margin: spacing(1) 0;
        }

        &__section {
            margin-bottom: spacing(2);

            .form-button {
                margin-right: spacing(2);

                &:last-child {
                    margin-right: 0;
                }
            }
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