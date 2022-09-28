import axios from "axios";

const privateInstance = axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    "Content-Type": "application/json",
  },
  Accept: "application/json",
  withCredentials: true,
});

export default privateInstance;
