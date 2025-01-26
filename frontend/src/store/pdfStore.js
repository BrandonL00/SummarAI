import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const pdfStore = create((set) => ({
  file: null,

  setFile: (file) => set({ file }),
  
  uploadFile: async () => {
    const { file } = pdfStore.getState();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axiosInstance.post("/upload", formData, {
        withCredentials: true, // Include cookies for authentication
      }); 
      toast.success("File Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.response.data.message);
    }
  },
}));