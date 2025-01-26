import { useEffect, useState } from "react";
import { gptStore } from "../store/gptStore";

const Summarize1 = () => {
    const { summarizeUpTo } = gptStore();
    const [summary, setSummary] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
          const result = await summarizeUpTo();
          setSummary(result.summary);
        };
    
        fetchSummary();
      }, [summarizeUpTo]);

    return (
      <div className="h-full w-96 bg-white rounded-lg shadow-lg mt-56 -translate-x-0 p-8">
        <h1 className="font-bold text-2xl">Summary</h1>
        <p>{summary}</p>
      </div>
    );
  };
  
  export default Summarize1;
  