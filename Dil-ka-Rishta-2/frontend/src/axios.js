import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/', // Adjust the base URL as needed
});

// Add a request interceptor to include the token in headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request error:', error); // Log request error for debugging
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Check for specific status codes
      switch (error.response.status) {
        case 400:
          console.error('Bad Request: Check your request parameters.', error.response.data);
          break;
        case 401:
          console.error('Unauthorized: Please login again.');
          // Optionally redirect to login or show a message
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource.');
          break;
        case 404:
          console.error('Not Found: The requested resource was not found.');
          break;
        case 500:
          console.error('Server error: Please try again later.');
          break;
        default:
          console.error('An unexpected error occurred:', error.response.data);
      }
    } else {
      // Handle errors that are not response errors (e.g., network issues)
      console.error('Network error or request was not received:', error);
    }
    return Promise.reject(error);
  }
);

export default instance;
