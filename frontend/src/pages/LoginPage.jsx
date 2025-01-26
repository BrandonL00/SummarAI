import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

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
  };

  return (

    <div className="h-dvh min-h-max grid gap-4 sm:gap-2 justify-center items-center bg-[#bedaff] ">
      {/*Logo and Welcome Message:*/}
      <div className="mt-24 grid justify-center items-center text-center ">
        <img className="justify-self-center" src="/sum-logo.png" alt="logo" />
        <h1 className="font-bold text-3xl"> Welcome to SummarAI! </h1>
        <p className="text-lg"> Sign in to get started </p>

      </div>

      {/*Sign in Form:*/}
      <div className="card bg-white  w-[90vw] max-w-md shadow-2xl mb-32 justify-self-center rounded-3xl sm:w-[85vw] md:w-[75vw] lg:w-[65vw]">
        <div className="card-body p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/*Email Field:*/}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-base font-medium ">Email</span>
              </label>
              <div className="relative">
                <img
                  src="/mail.svg"
                  alt="email icon"
                  className="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 left-3"
                />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 h-11 text-base "
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/*Password Field:*/}
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text text-base font-medium ">
                  Password
                </span>
              </label>
              <div className="relative">
                <img
                  src="/lock.svg"
                  alt="lock icon"
                  className="absolute w-5 h-5 top-1/2 transform -translate-y-1/2 left-3"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 h-11 text-base"
                  placeholder="•••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute w-9 h-9 top-1/2 transform -translate-y-1/2 right-1 flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img
                      src="/open_eye.svg"
                      alt="hide password"
                      className="w-5 h-5"
                    />
                  ) : (
                    <img
                      src="/closed_eye.svg"
                      alt="show password"
                      className="w-5 h-5"
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-info w-full h-11 text-base text-white font-semibold mt-2"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p className="text-base-content/60 text-sm ">
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
  );
};

export default LoginPage;
