import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const pdfStore = create((set) => ({
  file: null,
  files: [],
  setFile: (file) => set({ file }),
  setFiles: (files) => set({ files }),
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

  getFiles: async () => {
    try {
      const response = await axiosInstance.get("/files/file-keys", {
        withCredentials: true, // Include cookies for authentication
      });

      const fileKeys = response.data.fileKeys;
      const files = await Promise.all(
        fileKeys.map(async (key) => {
          const fileResponse = await axiosInstance.get(
            `/files/getFile?fileKey=${key}`,
            {
              withCredentials: true, // Include cookies for authentication
            }
          );
          console.log("File Response:", fileResponse);
          return fileResponse.data;
        })
      );

      set({ files });
      toast.success("Files Retrieved Successfully");
    } catch (error) {
      console.error("Error retrieving files:", error);
      toast.error("Error retrieving files");
    }
  },
}));
