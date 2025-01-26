import { useStore } from 'zustand';
import { pdfStore } from '../store/pdfStore';
import PDF from './Pdf';
import Book from './Book';



const BookContainer = () => {
  const { selectedFile } = useStore(pdfStore);

  return (
    <div className="w-full h-[105dvh] justify-center text-center bg-lightGray-50">
      <Book/>
    </div>
  );
};

export default BookContainer;