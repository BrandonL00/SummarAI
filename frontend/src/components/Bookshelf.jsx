import React, { useEffect, useRef } from "react";
import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore.js";

const Bookshelf = () => {
  const { files, getFiles, selectedFile, setSelectedFile } = useStore(pdfStore);
  const bookshelfRef = useRef(null);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const extractFileName = (url) => {
    const match = url.match(/-([^/]+\.pdf)\?/);
    if (match) {
      let fileName = match[1];
      // Replace special characters (except ') and numbers with spaces, and remove "pdf" substrings
      fileName = fileName.replace(/[^a-zA-Z']/g, " ").replace(/pdf/gi, "");
      return fileName.trim();
    }
    return "Unknown file";
  };

  const openBook = (file) => () => {
    setSelectedFile(file);
    console.log("Selected File:", selectedFile);
  };

  const scrollLeft = () => {
    if (bookshelfRef.current) {
      bookshelfRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (bookshelfRef.current) {
      bookshelfRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-lightGray-50 h-screen w-4/5 rounded-3xl p-10 overflow-y-scroll">
      <div className="flex pb-4">
        <h1 className="text-2xl font-semibold pl-4">My Bookshelf </h1>
        <p className="text-lg pl-5 pt-1 text-gray-500">{files.length}</p>

        <div className="justify-self-end space-x-4 ml-auto -translate-y-1">
        <button onClick={scrollLeft} className="btn btn-primary">
          &lt;
        </button>
        <button onClick={scrollRight} className="btn btn-primary">
          &gt;
        </button>
      </div>
      </div>

      <div className="flex items-center">
        <div
          ref={bookshelfRef}
          className="flex gap-10 overflow-x-scroll h-1/2 pb-4"
        >
          {files.map((file, index) => (
            <div
              key={index}
              className="card bg-white min-w-80 text-lg font-semibold text-center overflow-clip flex flex-col justify-between"
            >
              <div className="card-body gap-48">
                <h1 className="text-clip h-20">{extractFileName(file.url)}</h1>
                <button
                  className="btn btn-primary justify-self-end mx-4"
                  onClick={openBook(file)}
                >
                  Open Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
