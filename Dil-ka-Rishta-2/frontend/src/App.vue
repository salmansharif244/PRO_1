<template>
  <div id="app">
    <nav class="nav-container">
      <!-- Brand -->
      <div class="nav-brand" @click="goToHome">
        <img src="@/assets/logo1.png" alt="Logo" class="logo" />
        <span class="brand-name">Dil Ka Rishta</span>
      </div>

      <!-- Navigation Links -->
      <div class="nav-content">
        <div class="nav-links" :class="{ show: menuOpen }">
          <router-link to="/" class="nav-item">Home</router-link>
          <router-link to="/about" class="nav-item">About Us</router-link>
          <router-link to="/contact" class="nav-item">Contact Us</router-link>

          <!-- Show Auth Links for Non-Authenticated Users -->
          <div class="auth-links" v-if="!isAuthenticated">
            <router-link to="/login" class="auth-link">Login</router-link>
            <router-link to="/register" class="auth-link">Register</router-link>
          </div>
        </div>

        <!-- Authenticated User Links -->
        <div class="auth-logged-in" v-if="isAuthenticated">
          <router-link to="/profile" class="auth-link">Profile</router-link>
          <router-link to="/notifications" class="auth-link message-icon">
            <i class="fas fa-bell"></i> 
          </router-link>
          <router-link to="/messages" class="auth-link message-icon">
            <i class="fas fa-envelope"></i>
          </router-link>
          <button @click="confirmLogout" class="logout-button">Logout</button>
        </div>

        <!-- Hamburger Icon -->
        <div class="hamburger" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      menuOpen: false, // State for mobile menu
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    ...mapActions(['logout']),
    confirmLogout() {
      if (confirm('Are you sure you want to logout?')) {
        this.logout();
      }
    },
    goToHome() {
      this.$router.push('/HomePage'); // Redirect to homepage when clicking the logo
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>



<style scoped>
/* Base Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navigation Container */
.nav-container {
  position: sticky;
  top: 0;
  background-color: #f8b3d0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

/* Brand Styling */
.nav-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.brand-name {
  font-size: 22px;
  font-weight: bold;
  color: #4e4e4e;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

/* Navigation Links */
.nav-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  font-size: 20px;
  color: #070707a6;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s, color 0.3s;
  position: relative;
}

.nav-item:hover {
  background: linear-gradient(90deg, #007bff, #ff99cc);
  color: white;
  transform: scale(1.05);
}

/* Auth Links */
.auth-links {
  display: flex;
  gap: 15px;
}

.auth-logged-in {
  display: flex;
  align-items: center;
  gap: 15px;
}

.auth-link {
  font-size: 20px;
  color: #070707a6;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  background-color: #ffffff;
  font-weight: bold;
  transition: all 0.3s;
}

.auth-logged-in .auth-link {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #070707a6;
  padding: 8px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s;
}

.auth-logged-in .auth-link i {
  margin-right: 5px;
  font-size: 1.2em;
}

.auth-logged-in .auth-link:hover {
  background: linear-gradient(90deg, #007bff, #ff99cc);
  color: #ffffff;
  transform: scale(1.05);
}

.auth-link:hover {
  background: linear-gradient(90deg, #007bff, #ff99cc);
  color: #ffffff;
  transform: scale(1.05);
}

.logout-button {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.logout-button:hover {
  background: linear-gradient(90deg, #007bff, #ff99cc);
  color: #ffffff;
  transform: scale(1.05);
}

/* Hamburger Menu for Mobile */
.hamburger {
  display: none;
  font-size: 24px;
  color: #4e4e4e;
  cursor: pointer;
}

.hamburger i:hover {
  color: #ff4081;
}

/* Mobile Menu */
.nav-links.show {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  top: 70px;
  right: 20px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.nav-links.show a {
  color: #007bff;
  font-weight: bold;
}

.nav-links.show .auth-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
  }

  .nav-auth {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links.show {
    right: 0;
    left: 0;
  }

  .brand-name {
    font-size: 20px;
  }

  .nav-item,
  .auth-link {
    font-size: 14px;
  }
}
</style>

