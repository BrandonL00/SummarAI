import Navbar from "../components/Navbar";
import Bookshelf from "../components/Bookshelf";
import BookContainer from "../components/BookContainer.jsx";
import Sidebar from "../components/Sidebar";
import { pdfStore } from "../store/pdfStore.js";
import { useStore } from "zustand";

const HomePage = () => {
    const { selectedFile } = useStore(pdfStore);
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar />
      <div className="flex">
        {selectedFile ? (
          <BookContainer />
        ) : (
          <>
            <Sidebar />
            <Bookshelf />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
