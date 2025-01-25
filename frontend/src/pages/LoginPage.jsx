import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {   

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {login} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        login(formData);
      }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="">
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>

            <div>
            <p className="text-base-content/60 text-sm sm:text-base">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-info">
                  Sign Up
                </Link>
              </p>
            </div>
        </div>
    );
}

export default LoginPage;