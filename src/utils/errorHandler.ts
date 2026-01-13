// utils/errorHandler.ts
export const getErrorMessage = (error: any): string => {
  if (!error) return "Something went wrong";

  // Error is already a string
  if (typeof error === "string") return error;

  // Axios/HTTP error
  if (error.response) {
    const { data } = error.response;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    return `Server error: ${error.response.status}`;
  }

  // Error with message property
  if (error.message) {
    // Handle common error messages
    if (error.message.includes("Network Error")) {
      return "No internet connection. Please check your network.";
    }
    if (error.message.includes("timeout")) {
      return "Request timeout. Please try again.";
    }
    return error.message;
  }

  // Error with data property
  if (error.data) {
    if (typeof error.data === "string") return error.data;
    if (error.data.message) return error.data.message;
  }

  // Default
  return "Something went wrong. Please try again.";
};
