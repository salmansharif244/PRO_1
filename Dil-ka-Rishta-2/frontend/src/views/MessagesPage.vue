<template>
  <div class="message-page">
    <h1>Message Details</h1>
    <div v-if="loading" class="loading">Loading message...</div>
    <div v-else-if="!message" class="no-message">Message not found.</div>
    <div v-else class="message-content">
      <h2>From: {{ message.senderUsername }}</h2>
      <p><strong>Message:</strong> {{ message.content }}</p>
      <p><strong>Sent At:</strong> {{ formatDate(message.sentAt) }}</p>
      <router-link to="/messages" class="back-link">Back to Messages</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MessagePage',
  data() {
    return {
      loading: true,
      message: null,
    };
  },
  computed: {
    ...mapState(['messages']), // Assuming messages is stored in Vuex if needed
  },
  created() {
    this.fetchMessage();
  },
  methods: {
    async fetchMessage() {
      const messageId = this.$route.params.id; // Get the message ID from route params
      console.log('Fetching message with ID:', messageId); // Logging the message ID
      try {
        // Ensure messageId is a string
        if (typeof messageId !== 'string') {
          throw new Error('Invalid message ID format');
        }

        // Dispatch an action to fetch the message by ID
        this.message = await this.$store.dispatch('fetchMessageById', messageId);
      } catch (error) {
        console.error('Error fetching message:', error);
        this.message = null; // Set message to null if there's an error
      } finally {
        this.loading = false; // Set loading to false after fetching
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.message-page {
  padding: 20px;
  max-width: 600px;
  margin: auto;
  background-color: #ffffff; /* Changed to white for better contrast */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; /* Smooth transform on hover */
}

.message-page:hover {
  transform: scale(1.02); /* Slight scale up on hover */
}

h1 {
  font-size: 2.5em;
  color: #4A90E2; /* Blue color for the title */
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold; /* Bold font for emphasis */
}

.loading,
.no-message {
  text-align: center;
  color: #888; /* Gray for loading and not found messages */
  font-size: 1.2em; /* Larger font for visibility */
}

.message-content {
  margin-top: 20px;
}

h2 {
  color: #333; /* Dark gray for the sender's name */
  margin-bottom: 10px;
}

p {
  color: #555; /* Medium gray for message details */
  font-size: 1.1em; /* Slightly larger font for better readability */
  line-height: 1.6; /* More space between lines */
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #4A90E2; /* Same blue as title */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s; /* Smooth color transition */
}

.back-link:hover {
  text-decoration: underline;
  color: #3e7bba; /* Darker blue on hover */
}
</style>
