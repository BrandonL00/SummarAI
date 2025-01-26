import { useStore } from 'zustand';
import { pdfStore } from '../store/pdfStore';
import Book from './Book';
import AiForm from './AiForm';



const BookContainer = () => {
  const { selectedFile } = useStore(pdfStore);
  
  return (
    <div className="flex w-full h-[105dvh] justify-center text-center bg-lightGray-50">
      <Book/>
      <AiForm/>
    </div>
  );
};

export default BookContainer;