import axios from "axios";
const API_URL = `http://localhost:5000`;
// export by name
export const AxiosInstance = axios.create({
  baseURL: API_URL,
});
