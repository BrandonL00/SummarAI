const Navbar = () => {
  return (
    <div className="w-full flex px-10 pt-8">

      {/* Logo */}
      <div className="flex place-content-center">
        <img src="/logo.svg" alt="Logo" className="size-10" />
        <h1 className="text-3xl font-semibold text-center pl-4">SummarAI</h1>
      </div>

      <div className="justify-self-end ml-auto flex gap-6 items-center">
        
        {/* Profile Picture */}
        <img src="/circle.png" alt="Profile" className="size-18" />

        {/* Upload Button */}
        <button className="bg-blue-500 text-white rounded-3xl px-7 h-14 transition-transform transform hover:scale-105">
          <h1 className="text-2xl"> Upload </h1>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
