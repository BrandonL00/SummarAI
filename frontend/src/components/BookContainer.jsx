import { useStore } from 'zustand';
import { pdfStore } from '../store/pdfStore';
import Book from './Book';



const BookContainer = () => {
  const { selectedFile } = useStore(pdfStore);

  return (
    <div className="w-full h-screen justify-center text-center">
      <h1>Book Container</h1>
      <p>{selectedFile.url}</p>
      {/* {<PDF url={selectedFile.url}></PDF>} */}
      <Book/>
    </div>
  );
};

export default BookContainer;