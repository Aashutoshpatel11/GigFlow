import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = `${import.meta.env.VITE_SERVER_URL}/notifications`;

export const getUserNotifications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await axios.patch(`${API_URL}/${id}/read`);
  return response.data;
};