import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const gptStore = create((set) => ({
  currentPage: 1,

  summarizeUpTo: async (text, upTo) => {},

  generateFlashCardsUpTo: async (text) => {},

  summarizeCharacterUpTo: async (text, upTo) => {},
}));
