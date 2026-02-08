import axios from "axios";
const API_URL = isProduction 
  ? "https://69886d4c780e8375a68846cc.mockapi.io/users"  // MockAPI for live site
  : "http://localhost:3001/users";                      // Local server for coding

export const getUsers = () => axios.get(API_URL);

export const createUser = (data) => axios.post(API_URL, data);

// Added the missing update function
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);