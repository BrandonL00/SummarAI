import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore";

const Bookshelf = () => {
  const { files, getFiles } = useStore(pdfStore);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <div className="bg-lightGray-50 h-screen w-4/5 rounded-3xl p-10">
      <h1>Bookshelf</h1>
      <div className="">
        {files.map((file, index) => (
          <li key={index}>
            <button
              className="btn bg-blue-200"
              onClick={() => setSelectedFile(file)}
            >
              {file.url}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
