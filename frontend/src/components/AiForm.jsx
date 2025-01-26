import { pdfStore } from "../store/pdfStore";

const AiForm = () => {
  const { selectedFile } = pdfStore();

  return (
    <div className="h-1/2 w-1/4 bg-white rounded-lg shadow-lg mt-56 translate-x-48 p-8">
      <h1 className="text-xl font-semibold">Learn using AI!</h1>
      
    </div>
  );
};

export default AiForm;
