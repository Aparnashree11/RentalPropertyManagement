import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", res.data);
};

export const register = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const token = getToken();
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.role;
};

export const getName = () => {
  const token = getToken();
  const decoded = jwtDecode(token);
  return decoded.sub;
}
