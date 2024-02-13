import axios from 'axios';

const API_URL = 'http://localhost:3001'; // Replace with your backend API URL

const authservices = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      // Assuming your backend returns a token upon successful login
      const token = response.data.token;

      // Save the token to localStorage or session storage
      localStorage.setItem('token', token);

      return token;
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    // Remove the token from localStorage or session storage
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    // Check if the token exists in localStorage or session storage
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Optional: Function to get the token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Optional: Axios interceptor to add authorization header
  setupAxiosInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        const token = authservices.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};

export default authservices;
