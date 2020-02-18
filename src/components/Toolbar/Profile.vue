<template>
    <a href class="profile">
        <div class="profile__info">
            <span class="profile__name">Joseph Lincon</span>
        </div>
        <div class="profile__pic">
            <img src="https://picsum.photos/40" alt="Foto de perfil">
        </div>
    </a>
</template>

<script>

export default {
    name: 'Profile',
    components: {
    }
}
</script>

<style lang="scss">
    .profile {
        text-decoration: none;
        display: flex;
        align-items: center;

        &__pic {

            margin-left: spacing(2);
            
            img {
                border-radius: 50%;
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            text-align: right;
            color: white;
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