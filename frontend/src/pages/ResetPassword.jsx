import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) return toast.error("Passwords do not match");

    try {
      await api.post(`/auth/reset-password/${token}`, { newPassword: form.newPassword });
      toast.success("Password reset successful!");
      setSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96 text-center">
      {!success ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              placeholder="New Password"
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border p-2 rounded"
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Update Password</button>
          </form>
        </>
      ) : (
        <div className="text-green-600 font-semibold text-lg">✅ Password updated successfully!</div>
      )}
    </div>
  );
}
