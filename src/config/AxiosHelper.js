
// import axios from "axios";

// export const baseURL= "https://chat-app-backend-x9jj.onrender.com";

// export const httpClient = axios.create({
//     baseURL: baseURL,
// });

import axios from "axios";

export const baseURL = "https://chat-app-backend-x9jj.onrender.com";

// Create Axios instance
export const httpClient = axios.create({
  baseURL: baseURL,
});

// Add a response interceptor for error handling
httpClient.interceptors.response.use(
  (response) => {
    // If the request is successful, simply return the response
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Error Response:", {
        status: error.response.status,
        data: error.response.data,
      });
      alert(`Error ${error.response.status}: ${error.response.data}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response:", error.request);
      alert("Unable to reach the server. Please try again later.");
    } else {
      // An error occurred while setting up the request
      console.error("Request Error:", error.message);
      alert(`Unexpected error: ${error.message}`);
    }

    // Reject the error so it can still be caught by the specific request if needed
    return Promise.reject(error);
  }
);
