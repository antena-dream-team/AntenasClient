<template>
    <div class="project-view">
        <div v-if="hasSelectedProject()" class="box project-view__project">
            <div class="box__header">
                <h4 class="title">{{ project.title }}</h4>
                <a href @click.prevent="closeProject()" class="close">
                    <i class="material-icons">close</i>
                </a>
            </div>
            <div class="box__body project-body">
                <ProjectStatus class="project-view__phase" :project="project" />
                
                <ProjectUpdateForm 
                    v-if="$utils.getProjectStatus(project) === 'WAITING'"
                    :project="project"
                    class="project-view__form" 
                />
                
                <div class="project-view__info">
                    <div class="project-view__field" v-if="project.short_description">
                        <p class="label">Descrição breve:</p>
                        <p class="text">{{ project.short_description }}</p>
                    </div>
                    
                    <div class="project-view__field" v-if="project.complete_description">
                        <p class="label">Descrição completa:</p>
                        <p class="text">{{ project.complete_description }}</p>
                    </div>
                    
                    <div class="project-view__field" v-if="project.technology_description">
                        <p class="label">Descrição da tecnologia:</p>
                        <p class="text">{{ project.technology_description }}</p>
                    </div>

                    <div class="project-view__field" v-if="project.notes">
                        <p class="label">Notas adicionais:</p>
                        <p class="text">{{ project.notes }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="project-view__empty">
            <div class="content">
                <i class="material-icons icon">touch_app</i>
                <p class="text">Selecione um projeto ao lado para saber mais</p>
                <CustomButton 
                    class="button"
                    @click="createProject()" 
                >
                    Criar projeto
                </CustomButton>
            </div>
        </div>
    </div>
</template>

<script>
import CustomButton from '@/components/Forms/CustomButton.vue'
import ProjectStatus from '@/components/Project/ProjectStatus.vue'
import ProjectUpdateForm from '@/components/Project/ProjectUpdateForm.vue'

export default {
    name: 'ProjectView',
    props: {
        project: Object
    },
	components: {
        CustomButton,
        ProjectStatus,
        ProjectUpdateForm,
    },
    methods: {
        hasSelectedProject() {
            return !!Object.keys(this.project).length;
        },
        closeProject() {
            this.$emit('close');
        },
        createProject() {
            this.$emit('create');
        }
    },
	data() {
		return { };
	}
}
</script>

<style scoped lang="scss">
.project-view {

    &__empty {
        
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border: 2px dashed #D6D1D1;
        border-radius: 4px;

        .content {
            
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #9E9E9E;

            .icon {
                font-size: 78px;
            }

            .text {
                max-width: 320px;
                font-size: 24px;
                font-weight: $font-weight-semibold;
                text-align: center;
                margin: spacing(3) 0;
                line-height: 1.4em;
            }
        }
    }

    &__project {
        height: 100%;

        .project-body {
            max-height: 100%;
            height: calc(100% - 53px - (#{spacing(2)} * 2));
            overflow-y: auto;
        }
    }

    &__field {

        margin-bottom: spacing(2);

        &--horizontal {
            display: flex;
            align-items: center;
        }
        
        .label {
            color: $color-gray-dark;
            font-weight: $font-weight-semibold;
            margin-bottom: spacing(1);
        }

        .text {
            line-height: 1.4em;
        }
    }

    &__link {
        padding: spacing(1);
        border: solid 1px #0084E3;
        border-radius: 4px;
        color: #0084E3;
        font-weight: $font-weight-semibold;
        margin-right: spacing(2);
        display: block;
    }

    &__phase {
        margin-bottom: spacing(2);
    }

    &__form {
        margin-bottom: spacing(2);
    }
}
</style>
