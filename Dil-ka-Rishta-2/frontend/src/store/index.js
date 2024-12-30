import { createStore } from 'vuex';
import axios from '../axios'; // Adjust the path as necessary
import socket from '../socket'; // Import your Socket.IO client
import api from '../axios'; // Adjust this path as necessary

// Add Axios Interceptors to automatically attach the token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Persist user data
    profile: null, // Store user profile data
    profileError: null, // Store profile fetch/update error
    messages: [], // Store messages
    notifications: [], // Store notifications
    matches: [], // Store matches
  },
  mutations: {
    setUser(state, user) {
      console.log('Setting user:', user); // Log the user being set
      state.user = user; // Set user data in state
      if (user?.token) {
        localStorage.setItem('user', JSON.stringify(user)); // Persist user data locally
        localStorage.setItem('token', user.token); // Store token in local storage
      }
    },
    clearUser(state) {
      state.user = null; // Clear user data from state
      localStorage.removeItem('user'); // Remove user data from local storage
      localStorage.removeItem('token'); // Remove token from local storage
    },
    setProfile(state, profile) {
      state.profile = profile; // Set profile data
      state.profileError = null; // Clear any existing profile error
    },
    clearProfile(state) {
      state.profile = null; // Clear profile data
      state.profileError = null; // Clear profile error
    },
    setProfileError(state, error) {
      state.profileError = error; // Set profile error
    },
    setMessages(state, messages) {
      state.messages = messages; // Set messages in state
    },
    setMessage(state, message) {
      const index = state.messages.findIndex(msg => msg._id === message._id);
      if (index !== -1) {
        state.messages.splice(index, 1, message); // Update the message in the state
      } else {
        state.messages.push(message); // Add the message if it doesn't exist
      }
    },
    addMessage(state, message) {
      state.messages.push(message); // Add a new message to the messages array
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications; // Store notifications in state
    },
    setMatches(state, matches) {
      state.matches = matches; // Set matches
    },
  },
  actions: {
    async fetchProfile({ commit }) {
      console.log('Fetching user profile...'); // Log before API call
      try {
        const response = await axios.get('/profiles'); // Adjust backend route if necessary
        console.log('Profile fetched:', response.data); // Log the fetched profile
        commit('setProfile', response.data); // Commit profile data to state
      } catch (error) {
        console.error('Error fetching profile:', error); // Log any errors
        commit('setProfileError', error.message); // Commit error to state
      }
    },
    async updateProfile({ commit }, profileData) {
      try {
        const response = await axios.put('/profiles', profileData); // Adjust backend route if necessary
        commit('setProfile', response.data); // Commit updated profile data to state
      } catch (error) {
        console.error('Error updating profile:', error.response?.data || error);
        commit('setProfileError', 'Failed to update profile data.'); // Set profile error
        throw error; // Rethrow error for handling in the component
      }
    },
    async fetchMessages({ commit }, userId) {
      try {
        const response = await axios.get(`/messages/${userId}`);
        commit('setMessages', response.data); // Commit messages to state
      } catch (error) {
        console.error('Error fetching messages:', error.response?.data || error);
      }
    },
    async fetchMessageById({ commit }, messageId) {
      try {
        const response = await axios.get(`/messages/${messageId}`); // Adjust the URL as needed
        commit('setMessage', response.data); // Commit the fetched message to the state
        return response.data; // Return the fetched message
      } catch (error) {
        console.error('Error fetching message by ID:', error);
        throw error; // Rethrow the error for handling in the component
      }
    },
  
    async sendMessageAction({ state }, { receiverId, message }) {
      try {
        const senderId = state.user.id;
        const response = await api.post('/messages', {
          senderId,
          receiverId,
          content: message, // Make sure to match the field names expected by the backend
        });
        console.log('Message sent:', response.data);
      } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
      }
    },
    async created() {
      try {
        const response = await axios.get(`/notifications/${this.userId}`);
        this.notifications = response.data;
      } catch (error) {
        console.error('Error fetching notifications:', error.response.data);
      }
    },
    async fetchNotifications({ state, commit }) {
      const userId = state.user.id;
      try {
        const response = await axios.get(`/notifications/${userId}`);
        commit('SET_NOTIFICATIONS', response.data); // Assuming you have a mutation to set notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('/users/login', credentials);
        console.log('Login Response:', response.data); // Log the entire response

        const { id, username, email, token } = response.data;

        if (!id || !token) {
          throw new Error('User ID or token is missing in the login response.');
        }

        const userData = {
          id,
          username,
          email,
          token,
        };

        commit('setUser', userData); // Commit user data to state
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set token in headers

        await this.dispatch('fetchProfile'); // Fetch profile after login
      } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        throw error; // Rethrow error for handling in the component
      }
    },
    async register({ commit }, userData) {
      try {
        const response = await axios.post('/users/register', userData); // Adjust backend route if necessary
        const user = response.data;
        commit('setUser', user); // Commit user data to state
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`; // Set token in headers
        await this.dispatch('fetchProfile'); // Fetch profile after registration
      } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message);
        throw error; // Rethrow error for handling in the component
      }
    },
    async logout({ commit }) {
      commit('clearUser'); // Clear user data from state
      commit('clearProfile'); // Clear profile data from state
      commit('setMatches', []); // Clear matches from state
      delete axios.defaults.headers.common['Authorization']; // Remove token from headers
    },
    async fetchMatches({ commit }, userId) {
      console.log('Fetching matches for user ID:', userId); // Log the user ID
      try {
        const response = await axios.get(`/matches/${userId}`); // Adjust the endpoint as necessary
        console.log('Matches fetched:', response.data); // Log the fetched matches
        commit('setMatches', response.data); // Commit matches to state
      } catch (error) {
        console.error('Error fetching matches:', error); // Log any errors
      }
    },
    sendMessage({ commit }, messageData) {
      socket.emit('sendMessage', messageData); // Emit the message to the server
      commit('addMessage', messageData); // Add the message to the state immediately
    },
    listenForMessages({ commit }) {
      socket.on('receiveMessage', (message) => {
        commit('addMessage', message); // Add incoming message to the state
      });
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user; // Returns true if user is not null
    },
    getMatches(state) {
      return state.matches; // Getter for matches
    },
    getMessages: (state) => state.messages,

    // getMessages(state) {
    //   return state.messages; // Getter for messages
    // },
    getNotifications(state) {
      return state.notifications; // Getter for notifications
    },
    userProfile(state) {
      return state.profile; // Getter for user profile
    },
    profileError(state) {
      return state.profileError; // Getter for profile error
    },
    isUserLoggedIn(state) {
      return !!state.user; // Returns true if user is logged in
    },
  },
});

// Start listening for incoming messages when the store is created
store.dispatch('listenForMessages');

export default store;
