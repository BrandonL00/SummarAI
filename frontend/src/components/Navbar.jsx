import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { pdfStore } from "../store/pdfStore"
import { useAuthStore } from "../store/useAuthStore"

const Navbar = () => {
  const fileInputRef = useRef(null)
  const { setFile, uploadFile } = pdfStore()
  const { authUser, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log(file)
      setFile(file)
      uploadFile()
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full flex items-center px-10 py-6">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
        </Link>
        <h1 className="text-3xl font-semibold pl-4">SummarAI</h1>
      </div>

      <div className="ml-auto flex items-center gap-8">
        {/* Profile Picture Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            className="inline-flex w-full justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${authUser.name}`}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-96 origin-top-right z-50">
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={`https://ui-avatars.com/api/?background=random&name=${authUser.name}`}
                    alt="Profile"
                    className="w-full h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{authUser.name}</h2>
                  <p>{authUser.email}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          className="relative bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-full px-8 h-12 overflow-hidden group transition-all duration-300 ease-out hover:scale-105"
          onClick={handleUploadClick}
        >
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-full bg-gradient-to-r from-purple-500 to-blue-600 group-hover:translate-x-0"></span>
          <span className="relative flex items-center justify-center h-full">
            <h1 className="text-xl z-10 font-semibold">Upload</h1>
          </span>
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  )
}

export default Navbar

