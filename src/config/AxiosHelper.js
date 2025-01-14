
// import axios from "axios";

// export const baseURL= "https://chat-app-backend-x9jj.onrender.com";

// export const httpClient = axios.create({
//     baseURL: baseURL,
// });
import axios from "axios";
import toast from "react-hot-toast";

export const baseURL = "https://chat-app-backend-x9jj.onrender.com";

// Create Axios instance
export const httpClient = axios.create({
  baseURL: baseURL,
});

// Add a response interceptor for error handling
httpClient.interceptors.response.use(
  (response) => {
    // If the request is successful, return the response
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      const { status, data } = error.response;

      console.error("Error Response:", { status, data });

      // Notify user about the error
      toast.error(`Error ${status}: ${data.message || "Something went wrong!"}`);
    } else if (error.request) {
      console.error("No Response:", error.request);
      toast.error("Unable to reach the server. Please try again later.");
    } else {
      console.error("Request Error:", error.message);
      toast.error(`Unexpected error: ${error.message}`);
    }

    // Reject the error for specific error handling in individual requests
    return Promise.reject(error);
  }
);
