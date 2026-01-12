import axios from "axios"

axios.defaults.withCredentials = true

const API_URL = `${import.meta.env.VITE_SERVER_URL}/bids`

export const submitBid = async (bidData: { gigId: string; message: string; price: number }) => {
  const response = await axios.post(API_URL, bidData);
  return response.data
};

export const getBidsForGig = async (gigId: string) => {
  const response = await axios.get(`${API_URL}/${gigId}`)
  return response.data
};

export const hireFreelancer = async (bidId: string) => {
  const response = await axios.patch(`${API_URL}/${bidId}/hire`)
  return response.data
};