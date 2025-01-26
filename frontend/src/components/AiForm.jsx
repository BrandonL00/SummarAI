
const AiForm = ({ selectedOption, setSelectedOption }) => {

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="h-1/2 w-1/4 bg-white rounded-lg shadow-lg mt-56 translate-x-48 p-8">
      <h1 className="text-xl font-semibold mb-6 underline">Learn using AI!</h1>
      <form className="space-y-4 pl-6">
        <div className="form-control">
          <label className="label cursor-pointer justify-start">
            <input
              type="radio"
              name="aiOption"
              value="Generate Flashcards"
              checked={selectedOption === "Generate Flashcards"}
              onChange={handleOptionChange}
              className="radio radio-primary"
            />
            <span className="label-text ml-6">Generate Flashcards</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start">
            <input
              type="radio"
              name="aiOption"
              value="Summarize Book"
              checked={selectedOption === "Summarize Book"}
              onChange={handleOptionChange}
              className="radio radio-primary"
            />
            <span className="label-text ml-6">Summarize Book</span>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start">
            <input
              type="radio"
              name="aiOption"
              value="Summarize Characters"
              checked={selectedOption === "Summarize Characters"}
              onChange={handleOptionChange}
              className="radio radio-primary"
            />
            <span className="label-text ml-6">Explain Characters</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default AiForm;
