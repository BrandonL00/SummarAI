import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore";
import { gptStore } from "../store/gptStore";
import Book from "./Book";
import AiForm from "./AiForm";
import { useState, useEffect } from "react";
import GenFlash from "./GenFlash";
import Summarize1 from "./Summarize";
import Characters from "./Characters";

const BookContainer = () => {
  const { setCurrentPage } = useStore(gptStore);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPageLocal] = useState(1);

  useEffect(() => {
    setCurrentPage(currentPage);
    console.log(currentPage);
  }, [currentPage, setCurrentPage]);

  return (
    <div className="relative flex w-full h-[105dvh] justify-center text-center bg-lightGray-50">
      <Book 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPageLocal}
      />
      <AiForm
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div className="absolute left-10">
        {selectedOption === "Generate Flashcards" && <GenFlash />}
        {selectedOption === "Summarize Book" && <Summarize1 />}
        {selectedOption === "Summarize Characters" && <Characters />}
      </div>
    </div>
  );
};

export default BookContainer;
