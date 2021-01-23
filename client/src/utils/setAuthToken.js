import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply authorisation token to every request if logged in
    axios.defaults.headers.common["Authorisation"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorisation"];
  }
};

export default setAuthToken;
