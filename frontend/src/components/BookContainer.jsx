import { useStore } from "zustand";
import { pdfStore } from "../store/pdfStore";
import Book from "./Book";
import AiForm from "./AiForm";
import { useState } from "react";
import GenFlash from "./GenFlash";
import Summarize1 from "./Summarize";
import Characters from "./Characters";

const BookContainer = () => {
  const { selectedFile } = useStore(pdfStore);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="relative flex w-full h-[105dvh] justify-center text-center bg-lightGray-50">
      <Book />
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
