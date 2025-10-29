import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="firstName" onChange={handleChange} placeholder="First Name" className="w-full border p-2 rounded" />
        <input name="lastName" onChange={handleChange} placeholder="Last Name" className="w-full border p-2 rounded" />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account? <Link className="text-blue-600" to="/">Login</Link>
      </p>
    </div>
  );
}
