<template>
  <div class="home">
    <Toolbar />
    <div class="home__wrapper">
      <Projects 
        class="home__projects" 
        @select="selectProject" />
      
      <ProjectView 
        class="home__project-view" 
        :project="selectedProject"
        @close="deselectProject"
      />
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar/Toolbar.vue'
import Projects from '@/components/Project/Projects.vue'
import ProjectView from '@/components/Project/ProjectView.vue'

export default {
  name: 'Home',
  components: {
    Toolbar,
    Projects,
    ProjectView
  },
  methods: {
    selectProject(project) {
      this.selectedProject = project;
    },
    deselectProject() {
      this.selectedProject = {};
    }
  },
  data() {
    return {
      selectedProject: {}
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    
    &__wrapper {
      display: flex;
      max-width: 1080px;
      width: 90%;
      margin: spacing(4) auto;
      height: calc(100vh - 70px - #{spacing(4)} * 2);
    }

    &__projects,
    &__project-view {
      height: 100%;
    }

    &__project-view {
      margin-left: spacing(4);
      flex-grow: 1;
    }
  }
</style>