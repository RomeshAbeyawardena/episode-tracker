<script setup lang="ts">

import Toolbar from 'primevue/toolbar';
import { Button } from 'primevue';
import { RouterView } from 'vue-router';
import Menu from 'primevue/menu';

function toggle(){
  
}

</script>

<template>
   <Toolbar style="border-radius: 0.5rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
         <div class="flex items-center gap-2">
          <div class="flex items-center">
            <img src="./components/icons/icon.svg" alt="Epiode tracker" class="mr-2" />
            <label class="hidden sm:block">Episode Tracker</label>
          </div>
        </div>
      </template>
      <template #end>
        <div class="hidden sm:block">
            <Button label="Programmes" />
            <Button label="Settings" text plain />
            <Button label="Admin" text plain />
        </div>
        <div class="block sm:hidden">
            <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
        </div>
      </template>
    </Toolbar>
  <RouterView />
</template>
