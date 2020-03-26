<template>
    <div class="project-status">
        <div :class="getAccessClass()">
            <span class="project-status__label">{{ getLabel() }}:</span>
            <a href class="project-status__button" @click.prevent="showPopup()">
                {{ getButtonContent() }}
            </a>
        </div>

        <div class="project-status__popup" v-if="popupActive">
            <a 
                href 
                @click.prevent="hidePopup()" 
                class="close-icon"
            >
                <i class="material-icons close-icon">close</i>
            </a>

            <Timeline :phase="project.phase" />
        </div>
    </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue';

export default {
    props: {
        project: Object
    },
    components: {
        Timeline
    },
    methods: {
        showPopup () {
            this.popupActive = true;
        },
        hidePopup () {
            this.popupActive = false;
        },
        getAccessClass () {
            let base = 'project-status__access';
            let modificador = base + '--';

            if (['WAITING', 'PENDING'].includes(this.project.status)) {
                modificador += 'active';
            }
            else if (this.project.status === 'REFUSED') {
                modificador += 'refused';
            }
            else {
                modificador += 'done';
            }

            return [base, modificador];
        },
        getLabel () {
            if (['WAITING', 'PENDING'].includes(this.project.status)) {
                return 'Fase do projeto';
            }
            else {
                return 'Status do projeto';
            }
        },
        getButtonContent () {
            if (['WAITING', 'PENDING'].includes(this.project.status)) {
                return this.project.phase;
            }
            else if (this.project.status === 'REFUSED') {
                return 'Recusado';
            }
            else {
                return 'Concluído';
            }
        }
    },
    data() {
        return {
            popupActive: false
        };
    }
}
</script>

<style lang="scss" scoped>
    .project-status {

        position: relative;

        &__button {
            margin-left: 4px;
            font-weight: $font-weight-semibold;
        }

        &__label {
            color: $color-gray-dark;
            font-weight: $font-weight-semibold;
        }

        &__popup {
            position: absolute;
            padding: spacing(1);
            border-radius: 3px;
            box-shadow: shadow-depth(2);
            left: 140px;
            top: 20px;

            .close-icon {
                color: white;
                position: absolute;
                right: 2px;
                top: 2px;
                font-size: 16px;
            }
        }

        &__access {
            font-size: 16px;
            $background-opacity: .95;

            &--refused {
                
                .project-status__button {
                    color: $color-red;
                }

                + .project-status__popup {
                    background-color: rgba($color-red, $background-opacity);
                }
            }

            &--active {
                
                .project-status__button {
                    color: $color-blue-dark;
                }

                + .project-status__popup {
                    background-color: rgba($color-blue-dark, $background-opacity);
                }
            }
        }
    }
</style>