<template>
    <a href class="profile">
        <div class="profile__info">
            <span class="profile__name">{{ user.name }}</span>
        </div>
    </a>
</template>

<script>

export default {
    name: 'Profile',
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style lang="scss">
    .profile {
        text-decoration: none;
        display: flex;
        align-items: center;

        &__info {
            display: flex;
            flex-direction: column;
            text-align: right;
            color: $color-black;
        }

        &__name {
            font-weight: $font-weight-semibold;
            font-size: 16px;
        }

        &__status {
            align-self: flex-end;
            margin-top: 4px;
        }
    }
</style>