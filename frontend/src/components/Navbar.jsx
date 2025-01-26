import { Link } from "react-router-dom";
import { useRef } from "react";
import { pdfStore } from "../store/pdfStore";

const Navbar = () => {
  const fileInputRef = useRef(null);
  const { setFile, uploadFile } = pdfStore();
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
          <img src="/logo.svg" alt="Logo" className="size-10" />
        </Link>

        <h1 className="text-3xl font-semibold text-center pl-4">SummarAI</h1>
      </div>

      <div className="justify-self-end ml-auto flex gap-6 items-center">
        {/* Profile Picture */}
        <img src="/circle.png" alt="Profile" className="size-18" />

        {/* Upload Button */}
        <button
          className="bg-blue-500 text-white rounded-3xl px-7 h-12 transition-transform transform hover:scale-105"
          onClick={handleUploadClick}
        >
          <h1 className="text-lg">Upload</h1>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
