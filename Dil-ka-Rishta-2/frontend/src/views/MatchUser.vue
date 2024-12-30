<template>
  <div class="matched-users">
    <h1 class="title">Matched Users</h1>
    <div v-if="matches.length" class="matches-container">
      <div v-for="match in matches" :key="match.userId" class="match-card">
        <p class="user-info"><strong>Matched Username:</strong> {{ match.username || 'Unknown' }}</p>
        <p class="match-info"><strong>Interests:</strong> {{ match.interests.join(', ') }}</p>
        <p class="match-info"><strong>Location:</strong> {{ match.location }}</p>
        <p class="match-info"><strong>Gender:</strong> {{ match.gender || 'Not specified' }}</p>
        <p class="match-info"><strong>Birth Year:</strong> {{ match.birthYear }}</p>

        <button @click="sendMessage(match)" class="send-message-button">Send Message</button>
      </div>
    </div>
    <div v-else>
      <p class="no-matches">No matches found.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MatchedUsers',
  computed: {
    ...mapGetters(['getMatches']),
    matches() {
      return this.getMatches;
    },
  },
  methods: {
    ...mapActions(['fetchMatches', 'sendMessageAction']),
    async sendMessage(match) {
      const message = prompt(`Enter your message to ${match.username}:`); // Prompt for message input
      if (message) {
        try {
          await this.sendMessageAction({
            receiverId: match.userId,
            message,
          });
          alert('Message sent successfully!');
        } catch (error) {
          console.error('Error sending message:', error);
          alert('Failed to send the message.');
        }
      }
    },
  },
  created() {
    const userId = this.$store.state.user?.id;
    if (userId) {
      this.fetchMatches(userId).then(() => {
        console.log(this.matches); // Log matches to check their structure
      });
    } else {
      console.error('User ID is not available. Cannot fetch matches.');
    }
  },
};
</script>

<style scoped>
.matched-users {
  padding: 40px;
  background-color: #f9f9f9; /* Light background */
  text-align: center;
  transition: background-color 0.3s; /* Smooth transition for background */
}

.title {
  font-size: 2.5em;
  color: #e91e63; /* Bright pink for the title */
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Soft shadow for title */
}

.matches-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.match-card {
  background-color: #fff; /* White background for match cards */
  border: 2px solid #e91e63; /* Pink border */
  border-radius: 10px;
  padding: 20px;
  margin: 15px 0;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s; /* Animation on hover */
}

.match-card:hover {
  transform: translateY(-5px); /* Slight upward movement */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Deeper shadow on hover */
}

.user-info {
  color: #34495e; /* Use same color as match-info */
  font-size: 1.1em; /* Ensure font size matches other details */
  margin: 5px 0;
  opacity: 0.9; /* Similar opacity for a unified look */
  transition: opacity 0.3s; /* Smooth transition for opacity */
}

.user-info:hover {
  opacity: 1; /* Full opacity on hover */
}

.match-info {
  color: #34495e; /* Dark gray for match info */
  font-size: 1.1em;
  margin: 5px 0;
  opacity: 0.9; /* Slightly transparent for softer look */
  transition: opacity 0.3s; /* Smooth transition for opacity */
}

.match-info:hover {
  opacity: 1; /* Full opacity on hover */
}

.send-message-button {
  background-color: #f06292; /* Soft pink background for button */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s; /* Added box-shadow transition */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Initial shadow */
}

.send-message-button:hover {
  background-color: #ff8cf5; /* Darker pink on hover */
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}

.no-matches {
  color: #34495e; /* Dark gray for no matches message */
  font-size: 1.2em;
}

/* Animation for the entire matched-users section on load */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.matched-users {
  animation: fadeIn 0.5s ease-in-out; /* Fade in animation */
}
</style>
