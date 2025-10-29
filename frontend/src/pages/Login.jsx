import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-3"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
        <Link to="/forgot-password" className="text-sm text-blue-500 mt-3 block text-center">
          Forgot Password?
        </Link>
        <Link to="/signup" className="text-sm text-gray-500 mt-2 block text-center">
          Don’t have an account? Sign up
        </Link>
      </form>
    </div>
  );
}
