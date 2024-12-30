<template>
  <div class="notification-page">
    <h1>Notifications</h1>
    <div v-if="loading" class="loading">Loading notifications...</div>
    <div v-else-if="notifications.length === 0" class="no-notifications">No notifications available.</div>
    <ul v-else class="notification-list">
      <li 
        v-for="notification in notifications" 
        :key="notification._id" 
        class="notification-item"
        @click="goToMessagePage(notification.messageId)" 
      >
        <p class="notification-content">
          <strong>{{ notification.username }}:</strong> {{ notification.content }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NotificationPage',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(['notifications']),
  },
  created() {
    this.fetchNotifications();
  },
  methods: {
    async fetchNotifications() {
      try {
        await this.$store.dispatch('fetchNotifications');
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        this.loading = false;
      }
    },
    goToMessagePage(messageId) {
      // Use router to navigate to the message page
      this.$router.push({ name: 'MessagePage', params: { id: messageId } }); // Passing messageId as a parameter
    },
  },
};
</script>

<style scoped>
.notification-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: #fff5f8; /* Light pink background */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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
  font-size: 2.5em;
  color: #FF6F61; /* Coral color */
  text-align: center;
  margin-bottom: 20px;
}

.loading, .no-notifications {
  text-align: center;
  color: #888;
}

.notification-list {
  list-style-type: none;
  padding: 0;
}

.notification-item {
  margin-bottom: 15px;
  border: 1px solid #FFDD57; /* Light yellow border */
  border-radius: 10px;
  padding: 15px;
  background-color: #fff; /* White background for items */
  transition: box-shadow 0.3s, transform 0.2s; /* Transition for shadow and scaling */
  cursor: pointer;
}

.notification-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px); /* Slight upward movement on hover */
}

.notification-content {
  font-size: 1.1em;
  color: #333;
  margin: 0;
}

@media (max-width: 768px) {
  .notification-page {
    padding: 10px;
  }

  h1 {
    font-size: 2em;
  }

  .notification-item {
    padding: 10px;
  }
}
</style>
