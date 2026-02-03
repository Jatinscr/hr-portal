import axios from "axios";
const apiUrl = axios.create({
  baseURL: "http://192.168.1.48:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
apiUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
export default apiUrl;
