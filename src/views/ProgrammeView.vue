<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DataView from 'primevue/dataview';

import { useProgrammesStore } from "../stores/programmes";
import { onMounted } from "vue";
const programmesStore = useProgrammesStore();

onMounted(() => {
  programmesStore.fetchProgrammes();
});

const { programmes } = storeToRefs(programmesStore)

</script>

<template>
  <main>
    <data-view :value="programmes">
        
    </data-view>    
  </main>
</template>
