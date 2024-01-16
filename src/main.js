import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-pink/theme.css';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/primevue.min.css';
import './assets/main.css';
// import 'primeflex/primeflex.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia())
app.use(PrimeVue, { ripple: true, inputStyle: "filled" })
app.use(ToastService)
app.use(router)

app.mount('#app')
