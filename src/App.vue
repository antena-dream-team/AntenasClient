<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  mounted() {
    let token = localStorage.getItem('USER_TOKEN');
    let basePath = '/';
    let currentPath = this.$router.currentRoute.path;

    if (!token && currentPath !== basePath) {
      this.$router.push(basePath);
    }
    else if (token) {
      this.$store.dispatch('loadUserInfo', { token }).then(() => {
        if (currentPath !== '/home') {
          this.$router.push('/home');
        }
      });
    }
  }
}
</script>

<style lang="scss">
body { }
</style>
