<template>
  <div class="edit-profile-container">
    <h1>Edit Profile</h1>
    <form @submit.prevent="updateProfile" class="edit-profile-form">
      <div class="form-group">
        <label for="bio">Bio:</label>
        <textarea
          v-model="profile.bio"
          id="bio"
          placeholder="Enter your bio..."
          class="form-control"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="interests">Interests:</label>
        <input
          type="text"
          v-model="interestsInput"
          id="interests"
          placeholder="Enter your interests (comma separated)"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input
          type="text"
          v-model="profile.location"
          id="location"
          placeholder="Enter your location"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select v-model="profile.gender" id="gender" class="form-control">
          <option value="other">Other</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="preferredGender">Preferred Gender:</label>
        <select v-model="profile.preferredGender" id="preferredGender" class="form-control">
          <option value="other">Other</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="birthYear">Birth Year:</label>
        <input
          type="number"
          v-model="profile.birthYear"
          id="birthYear"
          placeholder="Enter your birth year"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="ageRangeMin">Age Range Min:</label>
        <input
          type="number"
          v-model="profile.ageRange.min"
          id="ageRangeMin"
          placeholder="Min age"
          required
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="ageRangeMax">Age Range Max:</label>
        <input
          type="number"
          v-model="profile.ageRange.max"
          id="ageRangeMax"
          placeholder="Max age"
          required
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>
    <router-link to="/profile" class="back-link">Back to Profile</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EditProfile',
  data() {
    return {
      profile: {
        bio: '',
        interests: [],
        location: '',
        gender: 'other',
        preferredGender: 'other',
        birthYear: null,
        ageRange: {
          min: null,
          max: null,
        },
      },
      interestsInput: '', // Temporary input for interests
    };
  },
  computed: {
    ...mapGetters(['userProfile']),
  },
  created() {
    // Fetch the current profile data to populate the form
    if (this.userProfile) {
      // Copy current profile data if userProfile is defined
      this.profile = { ...this.userProfile };

      // Check if interests is an array before calling join
      this.interestsInput = Array.isArray(this.profile.interests)
        ? this.profile.interests.join(', ')
        : ''; // Convert array to comma-separated string

      // Ensure ageRange is defined
      if (!this.profile.ageRange) {
        this.profile.ageRange = { min: null, max: null }; // Initialize ageRange if it's not defined
      }
    }
  },
  methods: {
    async updateProfile() {
      // Basic validation
      if (
        !this.profile.birthYear ||
        !this.profile.ageRange?.min ||
        !this.profile.ageRange?.max ||
        !this.profile.bio ||
        !this.profile.location
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      try {
        // Split the interests input into an array and trim whitespace
        this.profile.interests = this.interestsInput
          .split(',')
          .map((interest) => interest.trim())
          .filter((interest) => interest); // Filter out empty values

        // Log the profile data to verify
        console.log('Updating profile with data:', this.profile);

        // Call Vuex action to update profile
        await this.$store.dispatch('updateProfile', this.profile);
        this.$router.push('/profile'); // Redirect to profile page after update
      } catch (error) {
        console.error('Error updating profile:', error);
        // Optionally show an error message to the user's UI
      }
    },
  },
};
</script>

<style scoped>
.edit-profile-container {
  max-width: 600px;
  margin: 40px auto; /* Added top margin */
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #e91e63; /* Title color */
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
}

.edit-profile-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input,
textarea,
select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s, background-color 0.3s; /* Added transition for background color */
}

input:focus,
textarea:focus,
select:focus {
  border-color: #e91e63; /* Focus border color */
  outline: none;
  background-color: #f0f8ff; /* Light background on focus */
}

textarea {
  resize: vertical;
  min-height: 120px;
}

button.btn {
  background-color: #e91e63; /* Button background color */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: bold;
  margin-top: 10px; /* Added margin for button spacing */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Shadow for button */
}

button.btn:hover {
  background-color: #d81b60; /* Darker shade on hover */
  transform: scale(1.05);
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #e91e63; /* Link color */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
  font-size: 1.1rem; /* Slightly larger font size */
  border: 2px solid #e91e63; /* Border around the link */
  padding: 8px 16px; /* Padding for the link */
  border-radius: 5px; /* Rounded corners */
  text-align: center; /* Center text in link */
  background-color: #f9f9f9; /* Background color for link */
}

.back-link:hover {
  text-decoration: underline;
  color: #d81b60; /* Darker shade on hover */
  background-color: #e91e63; /* Change background color on hover */
  color: white; /* Change text color on hover */
}
</style>
