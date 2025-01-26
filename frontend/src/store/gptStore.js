import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { pdfStore } from "./pdfStore";

export const gptStore = create((set, get) => ({
  currentPage: 1,

  summarizeUpTo: async () => {
    const { selectedFile } = pdfStore.getState(); // Access selectedFile from pdfStore
    const { currentPage } = get(); // Access currentPage from gptStore

    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/gpt/summarizeUpTo?fileKey=${selectedFile}&pageLimit=${currentPage}`);
      toast.success("Summarization complete!");
      return response.data;
    } catch (error) {
      console.error("Error summarizing:", error);
      toast.error("Failed to summarize. Please try again.");
      throw new Error("Failed to summarize");
    }
  },
  generateFlashCardsUpTo: async (text) => {
    try {
      const response = await axiosInstance.post(`/gpt/generateFlashCards?fileKey=${selectedFile}&cardNum=10&pageLimit=${currentPage}`);
      toast.success("Flashcards generated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error("Failed to generate flashcards. Please try again.");
      throw new Error("Failed to generate flashcards");
    }
  },
  summarizeCharacterUpTo: async (upTo) => {
    const { selectedFile } = pdfStore.getState();

    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    try {
      const response = await axiosInstance.post(`/gpt/summarizeCharactersUpTo?fileKey=${fileKey}&pageLimit=${currentPage}`);
      toast.success("Character summary complete!");
      return response.data;
    } catch (error) {
      console.error("Error summarizing characters:", error);
      toast.error("Failed to summarize characters. Please try again.");
      throw new Error("Failed to summarize characters");
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }),
}));
