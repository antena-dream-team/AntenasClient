<template>
    <div class="project-creation">
        <div class="box project-creation__content">
            <div class="box__header">
                <h4 class="title">Criar novo projeto</h4>
                <a href @click.prevent="closeCreation()" class="close">
                    <i class="material-icons">close</i>
                </a>
            </div>
            <div class="box__body project-creation__form">
                <form @submit.prevent="submitProject">
                    <CustomInput
                        class="project-creation__field"
                        label="Titulo:"
                        v-model="project.title"
                    />
                    <CustomInput
                        class="project-creation__field"
                        label="Descrição curta:"
                        v-model="project.short_description"
                    />
                    <CustomTextarea
                        class="project-creation__field"
                        label="Notas adicionais (links, referências, ...):"
                        v-model="project.notes"
                        :rows="4"
                    />

                    <CustomButton :disabled="!isValid()" type="submit">
                        Cadastrar projeto
                    </CustomButton>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/Forms/CustomButton.vue'
import CustomInput from '@/components/Forms/CustomInput.vue'
import CustomTextarea from '@/components/Forms/CustomTextarea.vue'
import ProjectService from '@/services/ProjectService.js'

export default {
    name: 'ProjectView',
	components: {
        CustomButton,
        CustomInput,
        CustomTextarea,
    },
    methods: {
        isValid() {
            return this.project.title && this.project.short_description;
        },
        closeCreation() {
            this.$emit('close');
        },
        submitProject() {
            ProjectService
                .addProject(this.project)
                .then(project => {
                    this.closeCreation();
                    this.$emit('created', project);
                });
        }
    },
	data() {
		return {
            project: {
                title: '',
                short_description: '',
                notes: ''
            }
        };
	}
}
</script>

<style scoped lang="scss">
.project-creation {
    &__field {
        margin-bottom: spacing(2);
    }
}
</style>
