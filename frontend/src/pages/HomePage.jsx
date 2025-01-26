import Navbar from "../components/Navbar";
import Bookshelf from "../components/Bookshelf";
import BookContainer from "../components/BookContainer.jsx";
import Sidebar from "../components/Sidebar";
import { pdfStore } from "../store/pdfStore.js";
import { useStore } from "zustand";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { selectedFile, setSelectedFile } = useStore(pdfStore);

  const handleButtonPress = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className={`w-full h-screen relative ${
        selectedFile ? "overflow-auto" : "overflow-hidden"
      }`}
    >
      <Navbar />
      <div className="flex">
        {selectedFile ? (
          <>
            <Link to="/">
              <button onClick={handleButtonPress}>
                <img
                  src="/arrow_back.svg"
                  alt="Back"
                  className="absolute left-20 top-40 size-14 z-10"
                />
              </button>
            </Link>
            <BookContainer />
          </>
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
