import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p className="text-center mt-4 text-sm">
        Forgot your password? <Link className="text-blue-600" to="/forgot-password">Click here</Link>
      </p>
      <p className="text-center mt-2 text-sm">
        New user? <Link className="text-blue-600" to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
