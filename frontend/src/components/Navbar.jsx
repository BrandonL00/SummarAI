import { Link } from "react-router-dom";
import { useRef } from "react";
import { pdfStore } from "../store/pdfStore";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const fileInputRef = useRef(null);
  const { setFile, uploadFile } = pdfStore();
  const { authUser } = useAuthStore();
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        console.log(file);
      setFile(file);
      uploadFile();
    }
  };

  return (
    <div className="w-full flex px-10 pt-8 pb-4">
      {/* Logo */}
      <div className="flex place-content-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="size-10"/>
        </Link>

        <h1 className="text-3xl font-semibold text-center pl-4">SummarAI</h1>
      </div>

      <div className="justify-self-end ml-auto flex gap-6 items-center">
        {/* Profile Picture */}
        <img src={`https://ui-avatars.com/api/?background=random&name=${authUser.name}`} alt="Profile" className="size-18 rounded-full" />

        {/* Upload Button */}
        <button
          className="relative bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-3xl px-7 h-14 overflow-hidden group transition-all duration-300 ease-out hover:scale-105"
          onClick={handleUploadClick}
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-purple-500 to-blue-600 group-hover:translate-x-0"></span>
          <span className="relative flex items-center justify-center h-full">
            <h1 className="text-2xl z-10">Upload</h1>
          </span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
