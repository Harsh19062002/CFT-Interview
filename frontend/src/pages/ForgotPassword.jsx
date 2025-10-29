import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const baseURL = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/forgot-password`, { email });
      toast.success("Password reset link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
}
