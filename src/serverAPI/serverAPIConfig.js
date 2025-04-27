import axios from "axios";

export const serverBaseURL = process.env.REACT_APP_SERVER_BASE_URL;

// TODO DELETE THESE DEBUG LOGS
console.log("serverBaseURL");
console.log(serverBaseURL);

export const googleOAuthURL = `${serverBaseURL}/login/google`;

// Create an instance of axios
const apiClient = axios.create({
  baseURL: serverBaseURL,
  timeout: 10000, // Adjust timeout as needed
});

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response, // Let other responses pass through
  (error) => {
    if (error.response && error.response.status === 429) {
      // Handle 429 error globally
      alert("You have sent too many requests. Please try again later.");
    }
    return Promise.reject(error); // Let other errors pass through
  }
);

export default apiClient;
