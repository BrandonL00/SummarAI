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
    <div className="navbar bg-base-100 px-10 py-6">
      <div className="flex-1">
        <Link to="/" className="flex items-center" onClick={handleButtonPress}>
          <img src={isDarkTheme ? "/logo-white.svg" : "/logo.svg"} alt="SummarAI Logo" className="h-12 w-12" />
          <h1 className="text-3xl font-semibold pl-4 text-primary">SummarAI</h1>
        </Link>
      </div>
      <div className="flex-none gap-8">
        <ThemeSwitcher className="text-primary" />
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-14 rounded-full">
              <img src={`https://ui-avatars.com/api/?background=random&name=${authUser.name}`} alt={authUser.name} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-96">
            <li>
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
                    <img src="/person.svg" alt="Name" className="w-5 h-5" />
                    <h2 className="card-title">
                      Name: <span className="font-normal">{authUser.name}</span>
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <img src="/mail.svg" alt="Email" className="w-5 h-5" />
                    <p>
                      Email: <span className="font-normal">{authUser.email}</span>
                    </p>
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

