<template>
    <ul class="timeline">
        <li 
            class="timeline__phase" 
            :class="{ 'timeline__phase--active': index === phase }" 
            v-for="(currentPhase, index) in phases" 
            :key="`phase-${index}`">

            {{ currentPhase }}
        </li>
    </ul>
</template>

<script>

export default {
    name: 'Timeline',
    props: {
        phase: Number
    },
    components: {
    },
    data() {
        return {
            phases: [
                'Cadastro Inicial',
                'Avaliação Inicial',
                'Cadastro Detalhado',
                'Avaliação Detalhada',
                'Reunião',
                'Entrega'
            ]
        };
    },
    methods: {
    
    }
}
</script>

<style lang="scss" scoped>
    .timeline {
        display: flex;
        align-items: center;
        color: #2B51B2;
        width: 100%;
        justify-content: center;
        font-size: 16px;

        &__phase {
            font-weight: $font-weight-light;
            white-space: nowrap;
            max-width: 65px;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 spacing(1);

            &--active {
                font-weight: $font-weight-semibold;
                max-width: inherit;
            }
        }
    }
</style>