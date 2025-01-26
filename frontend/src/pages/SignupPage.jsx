import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {signup} = useAuthStore();

  const validateForm = () => {
    console.log("Validating...");
    if (!formData.name.trim()) {
      //console.log("name");
      return toast.error("Name is required");
    }
    if (!formData.email.trim()) {
      //console.log("email");
      return toast.error("Email is required");
    }
    if (!formData.password) {
      //console.log("password");
      return toast.error("Password is required");
    }
    if (formData.password.length < 6) {
      //console.log("6 lets");
      return toast.error("Password must be at least 6 characters");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    //console.log(formData);
    //console.log(success===true);
    if (success===true) signup(formData);
  };

  return (
    <div className="h-screen grid gap-4 sm:gap-2 justify-center items-center bg-[#bedaff] dark:bg-[#404d5e]">

      {/*Logo and Welcome Message:*/}
      <div className="mt-24 grid justify-center items-center text-center dark:text-white">
        <img className="justify-self-center" src="/sum-logo.png" alt="logo" />
        <h1 className="font-bold text-3xl"> Welcome to SummarAI! </h1>
        <p className="text-lg"> Sign up to get started </p>
      </div>

      {/*Sign Up Form:*/}
      <div className="card bg-white dark:bg-[#1c2025] w-[90vw] max-w-md shadow-2xl mb-32 justify-self-center rounded-3xl sm:w-[85vw] md:w-[75vw] lg:w-[65vw]">
  <div className="card-body p-6 sm:p-8">
    <form onSubmit={handleSubmit} className="space-y-3">
      {/*Name Field:*/}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text text-base font-medium">Name</span>
        </label>
        <div className="relative">
          <img src="/person.svg" alt="user icon" className="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type="text"
            className="input input-bordered w-full pl-10 h-11 text-base"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
      </div>

      {/*Email Field:*/}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text text-base font-medium">Email</span>
        </label>
        <div className="relative">
          <img
            src="/mail.svg"
            alt="email icon"
            className="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 left-3"
          />
          <input
            type="text"
            className="input input-bordered w-full pl-10 h-11 text-base"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      {/*Password Field:*/}
      <div className="form-control">
        <label className="label pb-1">
          <span className="label-text text-base font-medium">Password</span>
        </label>
        <div className="relative">
          <img src="/lock.svg" alt="lock icon" className="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 left-3" />
          <input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pl-10 h-11 text-base"
            placeholder="•••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute w-9 h-9 top-1/2 transform -translate-y-1/2 right-1 flex items-center justify-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src="/open_eye.svg" alt="hide password" className="w-5 h-5" />
            ) : (
              <img src="/closed_eye.svg" alt="show password" className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-info dark:border-black w-full h-11 text-base text-white font-semibold mt-2">
        Sign Up
      </button>

      <div className="text-center mt-4">
        <p className="text-base-content/60 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-info dark:text-white">
            Login
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>


    </div>
  )
}

export default SignUpPage
