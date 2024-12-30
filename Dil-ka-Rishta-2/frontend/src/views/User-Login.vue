<template>
  <div class="login-container">
    <h2 class="login-title">User Login</h2>
    <form @submit.prevent="performLogin" class="login-form">
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          autocomplete="email"
          class="form-input"
          placeholder="Enter your email"
        />
      </div>
      <div class="form-group">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          autocomplete="current-password"
          class="form-input"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" :disabled="isLoading" class="login-button">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      successMessage: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['login', 'fetchProfile']),
    async performLogin() {
      this.error = null;
      this.successMessage = null;
      this.isLoading = true;

      try {
        const credentials = { email: this.email, password: this.password };
        console.log('Login Credentials:', credentials);
        
        await this.login(credentials);
        await this.fetchProfile();
        
        this.successMessage = 'Login successful! Redirecting to dashboard...';
        
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 2000);
      } catch (err) {
        console.error('Login error:', err);
        this.error = err.response?.data?.message || 'Login failed. Please check your credentials.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f4f8;
}

.login-container {
  max-width: 450px;
  margin: 50px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in; /* Fade-in animation */
}

.login-title {
  text-align: center;
  color: #ff0d86;
  margin-bottom: 25px;
  font-size: 2rem;
  font-weight: bold;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 30px;
}

.form-label {
  margin-bottom: 10px;
  color: #424242;
  font-weight: 600;
  font-size: 23px;
  /* margin-left: 13px; */
}

.form-input {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  /* margin-left: 10px; */
  width: 100%; /* Full width for responsiveness */
  max-width: 320px; /* Max width for larger screens */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input::placeholder {
  color: #aaa;
  opacity: 1;
}

.form-input:focus {
  border-color: #ff69b4;
  box-shadow: 0 0 5px rgba(255, 105, 180, 0.5);
  outline: none;
}

.login-button {
  padding: 15px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%; /* Full width for responsiveness */
  max-width: 350px; /* Max width for larger screens */
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: pulse 0.6s infinite; /* Pulse animation */
}

.login-button:hover {
  background-color: #ff1493;
  transform: translateY(-2px);
}

.error {
  color: #dd1414;
  text-align: center;
  margin-top: 15px;
  font-size: 1.2em;
  font-weight: bold;
}

.success {
  color: #11c900;
  text-align: center;
  margin-top: 15px;
  font-size: 1.2em;
  font-weight: bold;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .login-container {
    margin: 20px; /* Reduced margin for smaller screens */
    padding: 20px; /* Reduced padding for smaller screens */
  }
  
  .login-title {
    font-size: 1.5rem; /* Adjust font size for smaller screens */
  }
}
</style>

