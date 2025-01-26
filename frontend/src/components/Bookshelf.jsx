import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

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
      {selectedFile && (
        <div className="pdf-viewer">
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
            <Viewer fileUrl={selectedFile} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
