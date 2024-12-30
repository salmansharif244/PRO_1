<template>
  <div class="home-page">
    <header class="header">
      <h1 class="fade-in">Welcome to Dil Ka Rishta</h1>
      <p class="fade-in">Your one-stop solution for finding meaningful connections.</p>
    </header>

    <div class="info-container">
      <section class="about slide-in">
        <h2>About Us</h2>
        <p>
          At Dil Ka Rishta, we believe in creating lasting relationships. Our platform is designed to connect individuals based on their interests, values, and preferences. Whether you are looking for friendship, companionship, or love, we are here to help you on your journey.
        </p>
      </section>

      <section class="features slide-in">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ 100% Verified Profiles</li>
          <li>✔ Advanced AI Matching</li>
          <li>✔ Dedicated Support</li>
          <li>✔ Privacy and Security</li>
          <li>✔ Diverse Community</li>
        </ul>
      </section>
    </div>

    <section class="testimonials slide-in">
      <h2>What Our Users Say</h2>
      <blockquote>
        "Thanks to Dil Ka Rishta, I found my perfect match! Highly recommend this platform." - Aisha K.
      </blockquote>
      <blockquote>
        "A wonderful experience! The team is very supportive, and the community is friendly." - Bilal M.
      </blockquote>
    </section>

    <section class="signup slide-in" v-if="!isUserLoggedIn">
      <h2>Join Us Today!</h2>
      <p>
        Sign up now to start your journey towards finding meaningful connections. It's free and easy!
      </p>
      <router-link to="/register" class="signup-button">Create an Account</router-link>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Dil Ka Rishta. All rights reserved.</p>
        <div class="contact-info">
          <h3>Contact Us:</h3>
          <p><i class="fas fa-envelope"></i> Email: support@dilkarishta.com</p>
          <p><i class="fas fa-phone"></i> Phone: (123) 456-7890</p>
          <p><i class="fas fa-map-marker-alt"></i> Address: 123 Love Lane, Heart City, PK</p>
        </div>
        <div class="office-hours">
          <h3>Office Hours:</h3>
          <p>Monday - Friday: 9 AM - 6 PM</p>
          <p>Saturday: 10 AM - 4 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['isUserLoggedIn']), // Get the user's login status from Vuex
  },
};
</script>

<style scoped>
.home-page {
  text-align: center;
  padding: 40px;
  background: linear-gradient(to bottom right, #f8b3d0, #ffe6e6); /* Romantic gradient background */
  font-family: 'Arial', sans-serif;
}

.header {
  margin-bottom: 30px;
}

h1 {
  color: #e91e63; /* Bright pink for heading */
  margin-bottom: 15px;
  animation: fadeIn 1s;
}

h2 {
  color: #e91e63; /* Bright pink for subheadings */
  margin: 25px 0 15px;
  font-size: 2em;
  border-bottom: 2px solid #e91e63;
  display: inline-block;
}

p {
  color: #34495e; /* Darker gray for paragraph text */
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.info-container {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */
}

.about, .features {
  width: 40%;
  padding: 20px;
  background-color: #f9cfd6; /* Light pink for boxes */
  border-radius: 10px;
  margin: 0 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Make about and features sections stack on smaller screens */
@media (max-width: 768px) {
  .about, .features {
    width: 100%; /* Full width on smaller screens */
    margin-bottom: 20px; /* Space between sections */
  }
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: #34495e;
  padding: 5px 0;
  font-size: 1.1em;
}

blockquote {
  font-style: italic;
  color: #34495e;
  margin: 20px auto;
  padding: 15px;
  border-left: 5px solid #e91e63;
  max-width: 600px;
  background-color: #f9cfd6;
  border-radius: 5px;
}

.signup {
  margin-top: 40px;
  background-color: #ff79b0; /* Lighter soft pink for signup section */
  padding: 20px;
  border-radius: 10px;
  color: white;
  animation: fadeIn 1s; /* Animation for signup section */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* Added shadow for depth */
}

.signup-button {
  display: inline-block;
  margin-top: 15px;
  padding: 12px 25px;
  background-color: #ff6f61; /* Coral pink background */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.3s; /* Transition for hover effect */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Shadow for button */
  width: auto; /* Set width to auto */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .signup-button {
    padding: 12px 20px; /* Adjust padding for smaller screens */
    font-size: 1em; /* Slightly smaller font size */
  }
}
.signup-button:hover {
  background-color: #ff9a8b; /* Light coral on hover */
  transform: scale(1.05); /* Slight scaling effect */
}

.footer {
  margin-top: 40px;
  padding: 20px;
  background-color: #ffaded; /* Dark navy blue for footer */
  color: #ecf0f1; /* Light text color for footer */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info, .office-hours {
  margin: 10px 0;
}

h3 {
  color: #ff6f61; /* Coral pink for section headings in footer */
}

.contact-info i {
  margin-right: 8px; /* Space between icon and text */
}

/* Animation Styles */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
