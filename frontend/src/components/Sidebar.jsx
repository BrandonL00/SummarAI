import React, { useState, useEffect } from "react"
import { useAuthStore } from "../store/useAuthStore"

const Sidebar = () => {
  const { logout, authUser } = useAuthStore()
  const [booksRead, setBooksRead] = useState(0)
  const [totalBooks, setTotalBooks] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    console.log("Auth User:", authUser)

    if (authUser && authUser.fileKeys) {
      const total = authUser.fileKeys.length
      const read = authUser.fileKeys.filter((file) => file.hasRead).length
      console.log("Total books:", total)
      console.log("Read books:", read)
      setBooksRead(read)
      setTotalBooks(total)
      setProgressPercentage(total > 0 ? Math.round((read / total) * 100) : 0)
    } else {
      console.log("Auth User or fileKeys not available")
      setBooksRead(0)
      setTotalBooks(0)
      setProgressPercentage(0)
    }
  }, [authUser])

  return (
    <div className="h-screen w-1/5 pt-10 px-4 text-center">
      {/* Radial Progress Circle */}
      <div className="flex justify-center items-center mb-6">
        <div
          className="radial-progress text-primary relative"
          style={{
            "--value": progressPercentage,
            "--size": "clamp(4rem, 12vw, 8rem)",
            "--thickness": "clamp(2px, 0.6vw, 5px)",
          }}
          role="progressbar"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-light flex items-baseline" style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}>
              <span className="text-purple-600 font-bold" style={{ fontSize: "clamp(1rem, 3vw, 2rem)" }}>
                {booksRead}
              </span>
              <span className="text-gray-400">/{totalBooks}</span>
            </span>
            <span className="font-light text-gray-400" style={{ fontSize: "clamp(0.65rem, 1.5vw, 1rem)" }}>
              finished
            </span>
          </div>
        </div>
      </div>

      {/* Add additional sidebar items here */}
      <div className="flex-grow">{/* You can add more sidebar content here */}</div>

      <div className="mt-auto flex justify-center pb-5">
        <button
          onClick={logout}
          className="text-red-500 underline mb-10 hover:text-red-700 transition-colors absolute bottom-5"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar

