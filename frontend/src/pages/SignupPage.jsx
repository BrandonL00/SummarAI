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
    <div className="h-dvh min-h-max grid gap-4 sm:gap-2 justify-center items-center bg-blue-200 dark:bg-slate-700">

      {/*Logo and Welcome Message:*/}
      <div className="mt-24 grid justify-center items-center text-center">
        <img className="justify-self-center" src="/logo.svg" alt="logo" />
        <h1 className="font-bold text-3xl"> Welcome to Entropy! </h1>
        <p className="text-lg"> Sign up to get started </p>
      </div>

      {/*Sign Up Form:*/}
      <div className="card card-normal bg-base-100 w-72 sm:w-96 shadow-2xl mb-24">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="gap-6"> 

            {/*Name Field:*/}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Your Name</span>
              </label>
              <div className="relative">
                <img src="/person.svg" alt="person icon" className="absolute size-8 inset-y-2 left-0 pl-3" />
                <input
                  type="text"
                  className={'input input-bordered w-full pl-12'}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

            </div>

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

            <button type="submit" className="btn btn-info w-full mt-4 mb-2">Create Account</button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60 text-sm sm:text-base">
              Already have an account?{" "}
              <Link to="/login" className="link link-info">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUpPage
