import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    login(formData);
  }

  return (
    <div className="h-dvh min-h-max grid gap-4 sm:gap-2 justify-center items-center bg-lightGray-50">

      {/*Logo and Welcome Message:*/}
      <div className="mt-24 grid justify-center items-center text-center">
        <img className="justify-self-center" src="/logo.svg" alt="logo" />
        <h1 className="font-bold text-3xl"> Welcome to SummarAI! </h1>
        <p className="text-lg"> Sign in to get started </p>
      </div>

      {/*Sign in Form:*/} 
      <div className="card bg-white w-72 sm:w-96 shadow-2xl mb-32 justify-self-center rounded-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="gap-6">

            {/*Email Field:*/}
            <div className="form-control mt-1">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <img src="/mail.svg" alt="person icon" className="absolute size-8 inset-y-2 left-0 pl-3" />
                <input
                  type="text"
                  className={'input input-bordered w-full pl-12'}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/*Password Field:*/}
            <div className="form-control mt-1">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <img src="/lock.svg" alt="person icon" className="absolute size-8 inset-y-2 left-0 pl-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={'input input-bordered w-full pl-12'}
                  placeholder="•••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="size-8 absolute inset-y-2 right-1 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="/open_eye.svg" alt="show password" />
                  ) : (
                    <img src="/closed_eye.svg" alt="show password" />
                  )}


                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-info w-full mt-4 mb-2">Login</button>

            <div className="text-center">
              <p className="text-base-content/60 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-info">
                  Sign Up
                </Link>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
