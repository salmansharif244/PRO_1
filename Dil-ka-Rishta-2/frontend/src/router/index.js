import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MessagesPage from '../views/MessagesPage.vue';
import NotificationPage from '../views/NotificationPage.vue';
import UserLogin from '../views/User-Login.vue';
import UserRegister from '../views/User-Register.vue';
import UserDashboard from '../views/User-Dashboard.vue';
import AboutUs from '../views/About-Us.vue';
import ContactUs from '../views/Contact-Us.vue';
import UserProfile from '../views/UserProfile.vue';
import store from '../store'; // Import the Vuex store
import EditProfile from '../views/EditProfile.vue';
import MatchUser from '../views/MatchUser.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutUs,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: MessagesPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/message/:id',
    name: 'MessagePage', // Renamed to avoid conflict
    component: MessagesPage, // Ensure it handles message ID properly
    meta: { requiresAuth: true },
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: NotificationPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'User-Login',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'User-Register',
    component: UserRegister,
  },
  {
    path: '/dashboard',
    name: 'User-Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/matches',
    name: 'MatchUser',
    component: MatchUser,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Check authentication from Vuex
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'User-Login' });
  } else {
    next();
  }
});

export default router;
