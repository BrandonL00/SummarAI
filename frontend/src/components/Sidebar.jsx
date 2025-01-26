import React from "react"
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const {logout} = useAuthStore();
    return (
      <div className="h-screen w-1/5 pt-10 px-4 text-center">
        
        <div className="mt-auto flex justify-center pb-5">
          <button onClick={logout} className="text-red-500 underline mb-10 hover:text-red-700 transition-colors absolute bottom-5">Logout</button>
        </div>

        {/* Radial Progress Circle */}
      <div className="flex justify-center items-center mb-6">
        <div
          className="radial-progress text-primary relative"
          style={{
            "--value": 70,
            "--size": "clamp(4rem, 12vw, 8rem)",
            "--thickness": "clamp(2px, 0.6vw, 5px)",
          }}
          role="progressbar"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-light flex items-baseline" style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}>
              <span className="text-purple-600 font-bold" style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}>
                7
              </span>
              <span className="text-black">/10</span>
            </span>
            <span className="font-light text-black" style={{ fontSize: "clamp(0.65rem, 1.5vw, 1rem)" }}>
              finished
            </span>
          </div>
        </div>
      </div>

        {/* Add additional sidebar items here */}
        <div className="flex-grow">
          
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  