<template>
	<div class="toolbar">
		<Logo class="toolbar__logo" />
		<Profile class="toolbar__profile" />
	</div>
</template>

<script>
import Logo from '@/components/Logo/Logo.vue';
import Profile from '@/components/Toolbar/Profile.vue';

export default {
	name: 'Toolbar',
	components: {
		Logo,
		Profile
	},
	data() {
		return {
		};
	}
}
</script>

<style scoped lang="scss">
.toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - #{spacing(3)} * 2);
	height: 70px;
	padding: 0 spacing(3);
	background-color: $color-blue;
	color: white;
	box-shadow: shadow-depth(3);

	&__search {
		flex-grow: 1;
		max-width: 600px;
		margin: 0 spacing(3);
	}
}
</style>
