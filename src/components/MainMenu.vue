<script setup lang="ts">
import { ref } from 'vue';
import Toolbar from 'primevue/toolbar';
import { Button } from 'primevue';
import Menu from 'primevue/menu';

const menu = ref();
const items = ref([{
  label: 'Programmes',
  icon: 'pi pi-fw pi-list',
}, {
  label: 'Settings',
  icon: 'pi pi-fw pi-cog',
}, {
  label: 'Admin',
  icon: 'pi pi-fw pi-user',
}]);

function toggle(event:MouseEvent) {
  menu.value.toggle(event);
}

</script>

<template>
<Toolbar style="border-radius: 0.5rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
         <div class="flex items-center gap-2">
          <div class="flex items-center">
            <img src="./icons/icon.svg" alt="Epiode tracker" class="mr-2" />
            <label class="hidden sm:block">Episode Tracker</label>
          </div>
        </div>
      </template>
      <template #end>
        <div class="hidden sm:block">
            <Button label="Programmes" icon="pi pi-fw pi-list" text plain />
            <Button label="Settings" icon="pi pi-fw pi-cog" text plain />
            <Button label="Admin" icon="pi pi-fw pi-user" text plain />
        </div>
        <div class="block sm:hidden">
            <Button type="button" 
              icon="pi pi-ellipsis-v" 
              @click="toggle" 
              aria-haspopup="true" 
              aria-controls="overlay_menu" />
            <Menu ref="menu" :model="items" popup id="overlay_menu" />
        </div>
      </template>
    </Toolbar>
</template>