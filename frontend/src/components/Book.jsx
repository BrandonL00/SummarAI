import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfStore } from "../store/pdfStore";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};
const scale = 0.6;
const maxWidth = 900;

export default function Book() {
  const { selectedFile } = pdfStore();
  const [file, setFile] = useState(selectedFile.url);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event) {
    const { files } = event.target;
    const nextFile = files?.[0];
    setFile(nextFile);
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < numPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <div className="Sample overflow-y-scroll w-[40%] h-[90%] mt-10 justify-center items-center place-content-center justify-self-center bg-white rounded-2xl translate-x-40">
      <div className="Sample__container">
        <div className="Sample__container__document flex justify-center items-center">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            options={options}
          >
            <Page
              pageNumber={currentPage}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) * scale : maxWidth * scale
              }
              className="border border-gray-300 my-4"
            />
          </Document>
        </div>
        <div className="flex justify-between items-center mt-4 mx-12">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= numPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
