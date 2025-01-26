import React, { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { pdfStore } from "../store/pdfStore"
import { useAuthStore } from "../store/useAuthStore"
import { ThemeSwitcher } from "./ThemeSwitcher"

const Navbar = () => {
  const fileInputRef = useRef(null)
  const { setFile, uploadFile, setSelectedFile } = pdfStore()
  const { authUser, logout } = useAuthStore()
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.getAttribute("data-theme") === "dark")
    }

    // Initial theme check
    updateTheme()

    // Set up a MutationObserver to watch for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [])

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

  const handleButtonPress = () => {
    setSelectedFile(null)
  }

  return (
    <div className="w-full flex items-center px-10 pt-6 pb-4">
      {/* Logo */}

      <Link to="/" className="flex items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-12 w-12"
          onClick={handleButtonPress}
        />
        <h1 className="text-3xl font-semibold pl-4">SummarAI</h1>
      </Link>

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
              className="size-14 rounded-full object-cover"
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
                  <div className="flex items-center gap-3">
                    <img src="/person.svg" alt="Name" className="size-5" />
                    <h2 className="card-title">
                      Name: <p className="pl-3">{authUser.name}</p>
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <img src="/mail.svg" alt="Email" className="size-5" />
                    <h2 className="flex">
                      Email: <p className="pl-10">{authUser.email}</p>
                    </h2>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-error" onClick={logout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button className="btn btn-primary text-primary-content rounded-full px-8 h-12" onClick={handleUploadClick}>
          Upload
        </button>
        <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  )
}

export default Navbar

