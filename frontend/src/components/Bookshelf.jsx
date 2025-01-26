import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore.js";

const Bookshelf = () => {
  const { files, getFiles, selectedFile, setSelectedFile } = useStore(pdfStore);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  const extractFileName = (url) => {
    const match = url.match(/-([^/]+\.pdf)\?/);
    return match ? match[1] : "Unknown file";
  };

  const openBook = (file) => () => {
    setSelectedFile(file);
    console.log("Selected File:", selectedFile);
  };

  return (
    <div className="bg-lightGray-50 h-screen w-4/5 rounded-3xl p-10 overflow-y-scroll">
      <h1 className="text-xl font-semibold pb-4 pl-4">My Bookshelf</h1>
      <div className="flex gap-10 overflow-x-scroll h-1/2 pb-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="card bg-white min-w-80 text-lg font-semibold text-center"
          >
            <div className="card-body space-y-4">
              <h1>{extractFileName(file.url)}</h1>
              <button
                className="btn btn-primary"
                onClick={openBook(file)}
              >
                Open Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
