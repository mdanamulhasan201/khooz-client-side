import axios from "axios";
const local = "http://localhost:5000";
// const production = "";
const api = axios.create({
  // function
  baseURL: `${local}/api`, //backend url
  withCredentials: true,
});

export default api;
