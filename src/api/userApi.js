import axios from "axios";

// Standardize the URL - No trailing slash
const BASE_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3001/users" 
  : "https://69886d4c780e8375a68846cc.mockapi.io/users";

export const getUsers = () => axios.get(BASE_URL);

// Create: Ensure no extra ID or metadata is being sent
export const createUser = (data) => axios.post(BASE_URL, data);

// Update: Ensure the URL is clean
export const updateUser = (id, data) => {
  // MockAPI prefers PUT /users/:id
  return axios.put(`${BASE_URL}/${id}`, data);
};

export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);