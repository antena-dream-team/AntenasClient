<template>
	<div class="box projects">
        <div class="box__header">
            <h4 class="title">Meus projetos</h4>
            <div class="actions">
                <CustomButton class="button" @click="goSignUp()">
                    Criar
                </CustomButton>
            </div>
        </div>
        <ul class="box__body box__body--no-horizontal-padding projects__list">
            <li class="projects__item" v-for="project in projects" :key="project.id">
                <a 
                    href
                    @click.prevent="selectProject(project)" 
                    class="projects__item-content"
                    :class="`projects__item-content--${project.status.toLowerCase()}`">
                    <div class="status"></div>
                    <div class="content">
                        <span class="title">{{ project.title }}</span>
                        <p class="description">
                            {{ project.shortDescription }}
                        </p>
                        <div class="updated">
                            <span>Atualizado em:</span>
                            <strong>{{ formatDate(project.lastUpdate) }}</strong>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
	</div>
</template>

<script>
import CustomButton from '@/components/Forms/CustomButton.vue'
import ProjectService from '@/services/ProjectService.js'

export default {
	name: 'Projects',
	components: {
        CustomButton
    },
    mounted() {
        ProjectService
            .getProjects()
            .then(projects => this.projects = projects);
    },
    methods: {
        addZero(number) {
            
            number = number.toString();

            if (number.length < 2) {
                return `0${number}`;
            }
            return number;
        },
        formatDate(datetime) {
            let date = new Date(datetime);
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();

            return `${this.addZero(day)}/${this.addZero(month)}/${year}`;
        },
        selectProject(project) {
            this.$emit('select', project);
        }
    },
	data() {
		return {
            projects: []
		};
	}
}
</script>

<style scoped lang="scss">
.projects {

    &__item-content {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: white;
        transition: background-color .2s ease-in-out;
        font-size: 14px;
        
        &:hover,
        &:focus {
            background-color: #FAFAFA;
        }

        .status {
            height: 100%;
            width: 6px;
        }

        .content {

            display: flex;
            flex-direction: column;
            margin-left: 17px;

            .title {
                font-weight: $font-weight-semibold;
                color: #0084E3;
            }

            .description {
                white-space: nowrap;
                max-width: 350px;
                color: #848484;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 4px;
            }

            .updated {
                color: #C9C9C9;
                margin-top: spacing(2);
                font-weight: $font-weight-light;

                strong {
                    margin-left: spacing(1);
                }
            }
        }

        &--waiting {
            .status {
                background-color: $color-blue-dark;
            }
        }

        &--processing {
            .status {
                background-color: $color-yellow;
            }
        }

        &--refused {
            .status {
                background-color: $color-red;
            }
        }

        &--approved {

        }
    }

    &__item {
        height: 78px;
        width: 100%;
        margin-top: spacing(2);

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>
