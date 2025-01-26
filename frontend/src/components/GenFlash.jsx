import { useEffect, useState } from "react";
import { gptStore } from "../store/gptStore";
import toast from "react-hot-toast";

const GenFlash = () => {
  const { generateFlashCardsUpTo } = gptStore();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const result = await generateFlashCardsUpTo();
        console.log("Raw flashcards data:", result.flashcards); // Debug log

        if (!result.flashcards || typeof result.flashcards !== "string") {
          throw new Error("Flashcards data is invalid or missing.");
        }

        // Parse the flashcards data
        const parsedFlashcards = result.flashcards
          .split("\n\n") // Separate each flashcard block by double newlines
          .map((card) => {
            const lines = card.split("\n"); // Split the block into lines
            const title = lines[0]?.trim(); // The first line is the flashcard title
            const details = lines.slice(1).map((detail) => detail.trim()); // Remaining lines are the details

            return {
              title: title || "Untitled Flashcard",
              details: details.length > 0 ? details : ["No details provided"],
            };
          });

        console.log("Parsed flashcards:", parsedFlashcards); // Debug log
        setFlashcards(parsedFlashcards);
      } catch (error) {
        console.error("Error generating flashcards:", error);
        toast.error("Failed to generate flashcards.");
      }
    };

    fetchFlashCards();
  }, [generateFlashCardsUpTo]);

  return (
    <div className="h-full w-96 bg-white rounded-lg shadow-lg mt-56 -translate-x-0 p-8">
      <h1 className="font-bold text-2xl mb-4">Flashcards</h1>

      {flashcards.length > 0 ? (
        <div>
          {flashcards.map((flashcard, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-lg shadow-md mb-4"
            >
              <h2 className="font-bold text-lg">{flashcard.title}</h2>
              <ul className="mt-2">
                {flashcard.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-sm">
                    - {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No flashcards available yet.</p>
      )}
    </div>
  );
};

export default GenFlash;
