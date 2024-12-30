import { createApp } from 'vue'; // Import createApp from Vue
import App from './App.vue';
import router from './router'; // Import the router
import store from './store'; // Import Vuex store
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome
import MatchUser from './views/MatchUser.vue'; // Import MatchUser
import './assets/tailwind.css';
import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App); // Create the app instance
app.component('MatchUser', MatchUser); // Registering globally

app.use(router); // Use the router
app.use(store); // Use the Vuex store

app.mount('#app'); // Mount the app to the DOMimport { createApp } from