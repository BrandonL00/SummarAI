import { useEffect, useState } from "react";
import { gptStore } from "../store/gptStore";

const Characters = () => {
  const { summarizeCharacterUpTo } = gptStore();
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await summarizeCharacterUpTo();
      const formattedSummary = result.characters.replace(/,/g, "\n");
      setSummary(formattedSummary);
    };

    fetchSummary();
  }, [summarizeCharacterUpTo]);

  return (
    <div className="max-h-[80dvh] overflow-scroll w-96 bg-white rounded-lg shadow-lg mt-52 -translate-x-0 p-8">
      <h1 className="font-bold text-2xl">Characters</h1>
      <p>{summary}</p>
    </div>
  );
};

export default Characters;
