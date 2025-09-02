import './assets/main.css';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system'
        }
    }
});
app.use(pinia);
app.use(router);
app.mount('#app');
