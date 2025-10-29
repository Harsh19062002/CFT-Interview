import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to your email!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Send Reset Link</button>
      </form>
      <p className="text-center mt-4 text-sm">
        Back to <Link className="text-blue-600" to="/">Login</Link>
      </p>
    </div>
  );
}
