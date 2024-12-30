<template>
  <div class="register-container">
    <h2 class="register-title">User Registration</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="form-group">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="form-input"
          placeholder="Enter your username"
        />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
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
          class="form-input"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" :disabled="isLoading" class="register-button">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Register</span>
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserRegister',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null,
      successMessage: null,
      isLoading: false, // State to manage loading state
    };
  },
  methods: {
    ...mapActions(['register', 'fetchProfile']),
    async register() {
      this.error = null;
      this.successMessage = null;
      this.isLoading = true;

      try {
        const userData = { username: this.username, email: this.email, password: this.password };
        console.log('UserData:', userData);
        await this.$store.dispatch('register', userData);
        this.successMessage = 'Registration successful! Redirecting to dashboard...';
        this.error = null; // Clear any previous error messages
        
        // Fetch the user profile after successful registration
        await this.fetchProfile();
        
        // Redirect to the dashboard after a short delay
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 2000); // Redirect after 2 seconds
      } catch (err) {
        console.error('Registration error:', err);
        this.error = err.response?.data?.message || 'Registration failed. Please try again.';
        this.successMessage = null; // Clear success message on error
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif; /* Base font for the body */
  background-color: #f0f4f8; /* Light background for the entire page */
  margin: 0; /* Reset default margin */
  padding: 0; /* Reset default padding */
}

.register-container {
  max-width: 450px; /* Maximum width for the container */
  margin: 50px auto; /* Center the container with top margin */
  padding: 40px; /* Increased padding inside the container */
  background-color: #ffffff; /* White background for the form */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1); /* Deeper shadow for more depth */
  animation: fadeIn 0.5s ease-in; /* Fade-in animation */
}

.register-title {
  text-align: center; /* Center the title */
  color: #ff69b4; /* Hot pink for title */
  margin-bottom: 25px; /* Margin below the title */
  font-size: 2rem; /* Font size for the title */
  font-weight: bold; /* Bold title */
}

.register-form {
  display: flex; /* Flexbox for form layout */
  flex-direction: column; /* Column direction for vertical stacking */
}

.form-group {
  margin-bottom: 20px; /* Increased margin for better spacing */
}

.form-label {
  margin-bottom: 8px; /* Space between label and input */
  color: #424242; /* Darker color for labels */
  font-weight: 600; /* Semi-bold font for labels */
  font-size: 1rem; /* Responsive font size */
}

.form-input {
  padding: 12px; /* Increased padding for input fields */
  border: 2px solid #ccc; /* Light gray border */
  border-radius: 5px; /* Rounded corners for input */
  font-size: 1rem; /* Font size for input text */
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition on focus */
  width: 100%; /* Full width for responsiveness */
  max-width: 340px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.form-input::placeholder {
  color: #aaa; /* Placeholder text color */
  opacity: 1; /* Ensures full opacity for placeholder */
}

.form-input:focus {
  border-color: #ff69b4; /* Highlight border color on focus */
  box-shadow: 0 0 5px rgba(255, 105, 180, 0.5); /* Glow effect on focus */
  outline: none; /* Remove default outline */
}

.register-button {
  padding: 12px; /* Increased padding for the button */
  background-color: #ff69b4; /* Primary button color */
  color: white; /* White text color */
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners */
  font-size: 1rem; /* Button text size */
  cursor: pointer; /* Pointer cursor on hover */
  width: 100%; /* Full width for responsiveness */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition on hover */
}

.register-button:hover {
  background-color: #ff1493; /* Darker shade of hot pink on hover */
  transform: translateY(-2px); /* Slight lift effect on hover */
}

.error {
  color: #e57373; /* Soft red color for error messages */
  text-align: center; /* Center the error message */
  margin-top: 15px; /* Space above the error message */
  font-size: 1.2em; /* Increased font size for success message */
  font-weight: bold; /* Bold font for success message */
}

.success {
  color: #0d9b00; /* Soft green color for success messages */
  text-align: center; /* Center the success message */
  margin-top: 15px; /* Space above the success message */
  font-size: 1.2em; /* Increased font size for success message */
  font-weight: bold; /* Bold font for success message */
}

button:disabled {
  background-color: #ccc; /* Disabled button color */
  cursor: not-allowed; /* Change cursor when disabled */
}

/* Responsive Styles */
@media (max-width: 480px) {
  .register-container {
    padding: 20px; /* Less padding on smaller screens */
    margin: 20px; /* Less margin on smaller screens */
  }

  .register-title {
    font-size: 1.5rem; /* Smaller font size for the title */
  }

  .form-label {
    font-size: 0.9rem; /* Smaller font size for labels */
  }

  .form-input, .register-button {
    font-size: 0.9rem; /* Smaller font size for inputs and buttons */
  }
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px); /* Start slightly above */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* End at original position */
  }
}

</style>
