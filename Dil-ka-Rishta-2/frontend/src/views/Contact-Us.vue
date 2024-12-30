<template>
  <div class="contact-us-container">
    <h1>Contact Us</h1>
    <p>If you have any questions, feel free to reach out to us!</p>
    
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea v-model="message" required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>

    <div class="contact-details">
      <h2>Contact Details</h2>
      <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
    </div>

    <div class="social-media">
      <h2>Follow Us</h2>
      <ul>
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook-f"></i> Facebook
          </a>
        </li>
        <li>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i> Twitter
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i> Instagram
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      alert(`Message sent from ${this.name} (${this.email}): ${this.message}`);
      // Reset form fields
      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>

<style scoped>
.contact-us-container {
  max-width: 600px; /* Set a max-width for the container */
  margin: 40px auto; /* Center the container and add top margin */
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  background-color: #f9f9f9; /* Light background color */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease; /* Fade-in animation */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #e91e63; /* Heading color */
  font-family: 'Arial', sans-serif;
  font-size: 2.5rem;
}

p {
  text-align: center;
  color: #555; /* Subtle color for the paragraph */
  margin-bottom: 20px;
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.contact-form div {
  margin-bottom: 20px; /* Spacing between form fields */
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%; /* Full width input and textarea */
  box-sizing: border-box;
  transition: border-color 0.3s, background-color 0.3s; /* Smooth transitions */
}

input:focus,
textarea:focus {
  border-color: #e91e63; /* Focus border color */
  outline: none;
  background-color: #f0f8ff; /* Light background on focus */
}

textarea {
  resize: vertical; /* Allow vertical resizing only */
  min-height: 120px; /* Minimum height for the textarea */
}

/* Center the button container */
.button-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  margin-top: 20px; /* Spacing above the button */
}

button {
  background-color: #e91e63; /* Button background color */
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 20px; /* Increased padding */
  width: 200px; /* Fixed width for the button */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: bold;
}

button:hover {
  background-color: #d81b60; /* Darker shade on hover */
  transform: scale(1.05);
}

.contact-details,
.social-media {
  margin-top: 30px; /* Spacing above contact details and social media sections */
}

.contact-details h2,
.social-media h2 {
  color: #e91e63; /* Section headings color */
  font-size: 1.5rem;
}

.contact-details {
  background-color: #fff; /* White background for contrast */
  padding: 20px; /* Padding around the content */
  border: 1px solid #e1e1e1; /* Subtle border */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  margin-top: 30px; /* Spacing from the form */
  text-align: center; /* Centered text alignment */
}

.contact-details h2 {
  color: #e91e63; /* Heading color */
  font-size: 1.8rem; /* Slightly larger font size */
  margin-bottom: 15px; /* Space below the heading */
}

.contact-details p {
  color: #333; /* Text color for contrast */
  font-size: 1.1rem; /* Increased font size */
  margin: 10px 0; /* Spacing between paragraphs */
}

.contact-details a {
  color: #e91e63; /* Link color matching the theme */
  text-decoration: none; /* No underline */
  font-weight: bold; /* Bold text for links */
}

.contact-details a:hover {
  text-decoration: underline; /* Underline on hover */
  color: #d81b60; /* Darker shade on hover */
}

.contact-details p,
.social-media ul {
  text-align: center; /* Center text for contact details and social media links */
  color: #333;
}

.social-media ul {
  list-style: none; /* Remove bullet points */
  padding: 0; /* Remove padding */
}

.social-media li {
  display: inline; /* Display links inline */
  margin: 0 15px; /* Space between social media links */
}

.social-media {
  background-color: #fff; /* White background for contrast */
  padding: 20px; /* Padding around the content */
  border: 1px solid #e1e1e1; /* Subtle border */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  margin-top: 30px; /* Spacing from the previous section */
  text-align: center; /* Centered text alignment */
}

.social-media h2 {
  color: #e91e63; /* Heading color */
  font-size: 1.8rem; /* Slightly larger font size */
  margin-bottom: 15px; /* Space below the heading */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .contact-us-container {
    padding: 15px; /* Reduce padding on smaller screens */
  }

  h1 {
    font-size: 2rem; /* Smaller font size for heading */
  }

  button {
    padding: 10px; /* Reduce button padding */
    font-size: 1rem; /* Smaller font size for button */
    width: 100%; /* Full width for button on smaller screens */
  }

  .button-container {
    width: 100%; /* Full width for button container */
  }

  .contact-details h2,
  .social-media h2 {
    font-size: 1.3rem; /* Smaller section heading font size */
  }
}
</style>



