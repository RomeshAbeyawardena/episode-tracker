<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainMenu from './components/MainMenu.vue';
import Panel from 'primevue/panel';
</script>

<template>
    <MainMenu />
    <Panel class="h-3/4">
      <div class="h-full">
      <RouterView />
      </div>
    </Panel>
</template>