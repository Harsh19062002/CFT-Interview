import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Base backend URL
  const baseURL = "http://localhost:5000/api";

  // ✅ Fetch user on token change (for page refresh)
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  // ✅ Fetch current logged-in user details
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseURL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      toast.error("Failed to fetch user");
    }
  };

  // ✅ Handle user login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${baseURL}/auth/login`, { email, password });
      const token = res.data.token;

      // Store token locally
      setToken(token);
      localStorage.setItem("token", token);

      toast.success("Login successful");

      // Fetch user immediately after login
      const userRes = await axios.get(`${baseURL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userRes.data.user);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ Handle signup
  const signup = async (firstName, lastName, email, password) => {
    try {
      await axios.post(`${baseURL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Signup successful! Please login.");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ Handle logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);
