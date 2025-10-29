import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form.firstName, form.lastName, form.email, form.password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        {["firstName", "lastName", "email", "password"].map((f) => (
          <input
            key={f}
            type={f === "password" ? "password" : "text"}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            className="w-full p-2 border mb-3"
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
        ))}
        <button className="bg-green-600 text-white w-full py-2 rounded">Signup</button>
        <Link to="/" className="text-sm text-gray-500 mt-3 block text-center">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
