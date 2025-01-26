import React, { useEffect, useRef, useState } from "react";
import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore.js";
import * as pdfjsLib from "pdfjs-dist";

const Bookshelf = () => {
  const { files, getFiles, selectedFile, setSelectedFile } = useStore(pdfStore);
  const bookshelfRef = useRef(null);
  const [thumbnails, setThumbnails] = useState({}); // Store generated thumbnails

  useEffect(() => {
    getFiles(); // Fetch files only once when the component mounts
  }, []); // Empty dependency array ensures it runs only on mount

  useEffect(() => {
    const loadThumbnails = async () => {
      const generatedThumbnails = { ...thumbnails }; // Copy existing thumbnails
      const newThumbnails = {}; // Track thumbnails generated in this batch

      for (const file of files) {
        // Skip files that already have a thumbnail
        if (generatedThumbnails[file.url]) continue;

        try {
          const response = await fetch(file.url);
          const arrayBuffer = await response.arrayBuffer();

          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 0.3 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          // Store the generated thumbnail as a data URL
          const thumbnail = canvas.toDataURL();
          generatedThumbnails[file.url] = thumbnail;
          newThumbnails[file.url] = thumbnail; // Track only newly added thumbnails
        } catch (error) {
          console.error(`Error loading thumbnail for ${file.url}:`, error);
        }
      }

      if (Object.keys(newThumbnails).length > 0) {
        setThumbnails((prev) => ({ ...prev, ...newThumbnails }));
      }
    };

    if (files.length > 0) {
      loadThumbnails();
    }
  }, [files]); // Only re-run when `files` change

  const extractFileName = (url) => {
    const match = url.match(/-([^/]+\.pdf)\?/);
    if (match) {
      let fileName = match[1];
      fileName = fileName.replace(/[^a-zA-Z']/g, " ").replace(/pdf/gi, "");
      return fileName.trim();
    }
    return "Unknown file";
  };

  const openBook = (file) => () => {
    setSelectedFile(file);
    console.log("Selected File:", file);
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
    <div className="bg-lightGray-50 h-screen w-4/5 rounded-3xl p-10 overflow-y-scroll shadow-md">
      <div className="flex pb-4">
        <h1 className="text-2xl font-semibold pl-4">My Bookshelf</h1>
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
              className="card bg-white w-[50dvh] h-[50dvh] text-lg font-semibold text-center overflow-clip flex flex-col justify-between"
            >
              <div className="card-body gap-12">
                {thumbnails[file.url] ? (
                  <img
                    src={thumbnails[file.url]}
                    alt={`Thumbnail of ${extractFileName(file.url)}`}
                    className="h-80 w-full object-cover"
                  />
                ) : (
                  <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
                    <span>Loading...</span>
                  </div>
                )}
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
