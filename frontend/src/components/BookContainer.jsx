import { useStore } from 'zustand';
import { pdfStore } from '../store/pdfStore';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { GlobalWorkerOptions } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookContainer = () => {
  const { selectedFile } = useStore(pdfStore);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full h-screen justify-center text-center">
      <h1>Book Container</h1>
      <p>{selectedFile.url}</p>
      <div>
        <Document file={selectedFile.url} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
};

export default BookContainer;