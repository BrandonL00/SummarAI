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

const maxWidth = 900;

export default function Book() {
  const { selectedFile } = pdfStore();
  const [file, setFile] = useState(selectedFile.url);
  const [numPages, setNumPages] = useState(null);
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

  return (
    <div className="Sample overflow-y-scroll h-screen mt-10 justify-center items-center place-content-center justify-self-center w-[55%] bg-white rounded-2xl">
      <div className="Sample__container">
        <div className="Sample__container__document">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            options={options}
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                className="border border-gray-300 my-4"
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
