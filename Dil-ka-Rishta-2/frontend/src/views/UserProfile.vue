<template>
  <div class="profile-container">
    <h1>User Profile</h1>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading">Loading profile...</div>

    <!-- Error Handling -->
    <div v-if="profileError" class="error">{{ profileError }}</div>

    <div v-else-if="profile" class="profile-card">
      <div class="profile-header">
        <h2 class="username">{{ profile.userId?.username || 'N/A' }}</h2>
        <p><strong>Email:</strong> {{ profile.userId?.email || 'N/A' }}</p>
      </div>

      <div class="profile-details">
        <p><strong>Bio:</strong> {{ profile.bio || 'N/A' }}</p>
        <p><strong>Interests:</strong> {{ profile.interests?.length > 0 ? profile.interests.join(', ') : 'N/A' }}</p>
        <p><strong>Location:</strong> {{ profile.location || 'N/A' }}</p>
        <p><strong>Gender:</strong> {{ profile.gender || 'N/A' }}</p>
        <p><strong>Preferred Gender:</strong> {{ profile.preferredGender || 'N/A' }}</p>
        <p><strong>Birth Year:</strong> {{ profile.birthYear || 'N/A' }}</p>
        <p><strong>Age Range:</strong> 
          {{ profile.ageRange?.min !== undefined && profile.ageRange?.max !== undefined 
            ? `${profile.ageRange.min} - ${profile.ageRange.max}` 
            : 'N/A' }}</p>
      </div>

      <div class="profile-actions">
        <router-link to="/messages" class="action-button">View Messages</router-link>
        <router-link to="/notifications" class="action-button">View Notifications</router-link>
        <router-link to="/edit-profile" class="action-button">Edit Profile</router-link>
      </div>
    </div>

    <div v-else>
      <p>Please log in to view your profile.</p>
    </div>

    <div class="matches-container">
      <MatchUser />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MatchUser from './MatchUser.vue'; // Import the MatchUser component

export default {
  name: 'UserProfile',
  components: {
    MatchUser, // Register the MatchUser component
  },
  computed: {
    ...mapGetters(['userProfile', 'profileError']),
    profile() {
      console.log('User Profile:', this.userProfile); // Log the user profile data
      return this.userProfile?.data || {}; // Access the data property
    },
    isLoading() {
      return !this.userProfile && !this.profileError; // Determine loading state
    },
  },
  created() {
    console.log('Fetching user profile...');
    this.$store.dispatch('fetchProfile');
  },
  watch: {
    userProfile: {
      handler() {
        // You can add any additional logic if needed when userProfile changes
      },
      deep: true, // Watch for deep changes in the userProfile object
    },
  },
};
</script>

<style scoped>
/* Styling for the User Profile */
.profile-container {
  max-width: 1200px; /* Set a maximum width for the profile page */
  margin: 0 auto; /* Center the container */
  padding: 20px; /* Padding around the content */
  font-family: 'Arial', sans-serif; /* Font family for a professional look */
  background-color: #f9f9f9; /* Light background for the entire container */
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for the container */
  display: flex; /* Flexbox for side-by-side layout */
  gap: 20px; /* Space between profile and matches */
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #e91e63; /* Brand color for the header */
  text-align: center; /* Center align the header */
  width: 100%; /* Full width for header */
}

.loading {
  font-size: 1.5rem;
  color: #007bff; /* Blue color for loading text */
  text-align: center; /* Center align loading text */
  width: 100%; /* Full width for loading text */
}

.error {
  color: red; /* Styling for error messages */
  margin-bottom: 20px; /* Add margin below error message */
  text-align: center; /* Center align error messages */
  width: 100%; /* Full width for error message */
}

.profile-card {
  background: white; /* White background for the card */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Enhanced shadow for depth */
  padding: 20px; /* Padding inside the card */
  margin-bottom: 20px; /* Margin below the card */
  flex: 1 1 300px; /* Allow profile card to grow and set minimum width */
  animation: fadeIn 0.5s; /* Animation for profile card */
}

.profile-header {
  border-bottom: 2px solid #e0e0e0; /* Light border under the header */
  padding-bottom: 10px; /* Padding at the bottom of header */
  text-align: center; /* Center align profile header */
}

.username {
  font-size: 2rem; /* Size for the username */
  color: #e91e63; /* Brand color for the username */
  margin: 0; /* Remove default margin */
}

.profile-details p {
  margin: 10px 0; /* Margin for details */
  color: #555; /* Gray color for details */
  font-size: 1rem; /* Size for details */
}

.profile-actions {
  margin-top: 20px; /* Space above actions */
  display: flex; /* Flexbox for alignment */
  gap: 10px; /* Space between action buttons */
  justify-content: center; /* Center align action buttons */
}

.action-button {
  background-color: #e91e63; /* Use the same color as the brand */
  color: white; /* Text color */
  padding: 10px 20px; /* Button padding */
  border-radius: 5px; /* Rounded corners */
  text-align: center; /* Center text */
  text-decoration: none; /* No underline */
  font-weight: bold; /* Bold links */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition */
  border: none; /* Remove default border */
  cursor: pointer; /* Pointer cursor on hover */
}

.action-button:hover {
  background-color: #c2185b; /* Darker shade on hover */
  transform: translateY(-2px); /* Slight lift on hover */
}

/* Matches Container */
.matches-container {
  flex: 1 1 300px; /* Allow matches container to grow and set minimum width */
  background: white; /* White background for the matches section */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Enhanced shadow for depth */
  padding: 20px; /* Padding for matches section */
  animation: fadeIn 0.5s; /* Animation for matches container */
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 800px) {
  .profile-container {
    flex-direction: column; /* Stack elements vertically on small screens */
    padding: 10px; /* Reduce padding on smaller screens */
  }

  .profile-card, .matches-container {
    width: 100%; /* Full width for both sections on small screens */
  }
}
</style>
