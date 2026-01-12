import axios from "axios";
// import type { Gig } from "../types";

axios.defaults.withCredentials = true;

const API_URL = `${import.meta.env.VITE_SERVER_URL}/gigs`;

export const getAllGigs = async (search: string = "") => {
  const response = await axios.get(`${API_URL}?search=${search}`);
  return response.data;
};

export const createGig = async (gigData: { title: string; description: string; budget: number }) => {
  const response = await axios.post(API_URL, gigData);
  return response.data;
};

export const getMyGigs = async () => {
  const response = await axios.get(`${API_URL}/my`);
  return response.data;
};