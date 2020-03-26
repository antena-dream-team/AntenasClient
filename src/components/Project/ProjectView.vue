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
                
                <form class="project-view__form"></form>
                
                <div class="project-view__info">
                    <div class="project-view__field" v-if="project.shortDescription">
                        <p class="label">Descrição breve:</p>
                        <p class="text">{{ project.shortDescription }}</p>
                    </div>
                    
                    <div class="project-view__field" v-if="project.description">
                        <p class="label">Descrição completa:</p>
                        <p class="text">{{ project.description }}</p>
                    </div>
                    
                    <div class="project-view__field" v-if="project.techDescription">
                        <p class="label">Descrição da tecnologia:</p>
                        <p class="text">{{ project.techDescription }}</p>
                    </div>

                    <div 
                        class="project-view__field project-view__field--horizontal" 
                        v-if="project.externalLink1 || project.externalLink2">
                        
                        <a  v-if="project.externalLink1"
                            class="project-view__link" 
                            :href="project.externalLink1"
                            target="_blank">

                            Link externo 1
                        </a>
                        <a  v-if="project.externalLink2"
                            class="project-view__link" 
                            :href="project.externalLink2"
                            target="_blank">

                            Link externo 2
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="project-view__empty">
            <div class="content">
                <i class="material-icons icon">touch_app</i>
                <p class="text">Selecione um projeto ao lado para saber mais</p>
                <CustomButton class="button">
                    Criar projeto
                </CustomButton>
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
        hasSelectedProject() {
            return !!Object.keys(this.project).length;
        },
        closeProject() {
            this.$emit('close');
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
}
</style>
