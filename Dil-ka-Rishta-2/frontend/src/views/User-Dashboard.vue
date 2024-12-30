<template>
  <div class="dashboard-container">
    <!-- Welcome Message -->
    <div class="welcome-banner">
      <h1>Welcome to Your Dashboard, {{ username }}!</h1>
      <p>We're glad to have you here! Explore the features and connect with others.</p>
    </div>

    <!-- User Activity Summary -->
    <div class="activity-section">
      <h2>Your Recent Activity</h2>
      <ul>
        <li><i class="fas fa-user-check"></i> Matched with 3 new users this week!</li>
        <li><i class="fas fa-envelope"></i> Sent 5 messages in the last 7 days.</li>
        <li><i class="fas fa-bell"></i> Checked your notifications 10 times this week.</li>
      </ul>
    </div>

    <!-- Recommended Actions -->
    <div class="actions-section">
      <h2>Recommended Actions</h2>
      <ul>
        <li><router-link to="/edit-profile">Complete your profile</router-link> for better matches.</li>
        <li><router-link to="/messages">Check your messages</router-link> to connect with others.</li>
        <li>Explore new features in the app!</li>
      </ul>
    </div>

    <!-- Tips and Resources -->
    <div class="tips-section">
      <h2>Tips for Success</h2>
      <p>Make sure to be honest and open in your interactions. Here are some tips:</p>
      <ul>
        <li>Be yourself and have fun!</li>
        <li>Stay safe and meet in public places.</li>
        <li>Communicate openly with your matches.</li>
      </ul>
    </div>

    <!-- Community Highlights -->
    <div class="highlights-section">
      <h2>Community Highlights</h2>
      <p>Check out these success stories from our users:</p>
      <div class="highlights-container">
        <div class="highlight">
          <img src="../assets/pic2.jpg" alt="ALI" class="user-image" />
          <p>User123 and User456 found love!</p>
        </div>
        <div class="highlight">
          <img src="../assets/pic1.jpg" alt="HAMZA" class="user-image" />
          <p>User789 had a great date last weekend.</p>
        </div>
      </div>
    </div>

    <!-- Profile Error Handling -->
    <div v-if="profileError" class="error-message">
      <p>Error fetching profile: {{ profileError }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserDashboard',
  computed: {
    ...mapState(['user', 'profile', 'profileError']),
    username() {
      console.log('User Profile:', this.profile);
      return this.profile?.data?.userId?.username || this.user?.username || 'Guest';
    },
  },
  created() {
    console.log('Fetching user profile...');
    this.$store.dispatch('fetchProfile');
  },
};
</script>

<style scoped>
/* Layout and Container */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fef3f2; /* Light pink background */
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Welcome Banner */
.welcome-banner {
  text-align: center;
  padding: 20px;
  background: linear-gradient(to right, #ffcccb, #fff3e6); /* Light pink to light yellow */
  color: #333;
  border-radius: 12px;
  margin-bottom: 20px;
  animation: fade-in 1s ease-out;
}

.welcome-banner h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.welcome-banner p {
  font-size: 1.2rem;
}

/* Section Headers */
h2 {
  font-size: 1.8rem;
  color: #ff6f61; /* Bright coral */
  margin-top: 20px;
  border-bottom: 2px solid #ffcccb; /* Light pink border */
  padding-bottom: 5px;
  text-align: center; /* Center headings */
  animation: slide-in 1s ease-out;
}

/* Lists */
ul {
  list-style: none;
  padding: 0;
  text-align: center; /* Center align list items */
}

ul li {
  font-size: 1.1rem;
  margin: 10px 0;
  color: #555;
}

/* Aligning icons with content */
ul li i {
  margin-right: 10px; /* Add space between icon and text */
  color: #ff6f61; /* Bright coral color for icons */
  font-size: 1.5rem; /* Increase icon size */
}

/* Community Highlights */
.highlights-container {
  display: flex;
  justify-content: center; /* Center the highlights container */
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
  margin-top: 15px;
}

.highlight {
  display: flex;
  align-items: center; /* Align items vertically */
  margin: 10px; /* Spacing between highlights */
  background: #fff; /* White background for each highlight */
  border: 1px solid #ffcccb; /* Light pink border */
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: calc(100% - 40px); /* Full width on smaller screens */
  max-width: 400px; /* Limit width on larger screens */
}

.user-image {
  width: 60px; /* Set a fixed width for the user image */
  height: 60px; /* Set a fixed height for the user image */
  border-radius: 50%; /* Make the image circular */
  margin-right: 15px; /* Space between image and text */
}

/* Centering tips and community highlights */
.tips-section,
.highlights-section {
  text-align: center; /* Center the text in these sections */
  margin: 20px 0; /* Add some margin for spacing */
}

/* Error Message */
.error-message {
  color: red;
  background: #ffe5e5; /* Light red background */
  padding: 10px;
  border: 1px solid #ff6f61; /* Pink border */
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  animation: shake 0.5s ease-in-out;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .welcome-banner h1 {
    font-size: 2rem; /* Smaller font size for h1 */
  }

  .welcome-banner p {
    font-size: 1rem; /* Smaller font size for paragraph */
  }

  h2 {
    font-size: 1.5rem; /* Smaller font size for section headers */
  }

  .highlight {
    width: calc(100% - 20px); /* Full width on small screens */
    margin: 5px; /* Reduced margin for smaller screens */
  }
}

@media (max-width: 480px) {
  .highlight {
    flex-direction: column; /* Stack image and text vertically on small screens */
    align-items: center; /* Center the items */
  }

  .user-image {
    margin-bottom: 10px; /* Space below image when stacked */
  }
}
</style>
