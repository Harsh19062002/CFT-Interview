import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow p-6 rounded w-96 text-center">
        <h2 className="text-xl font-bold mb-3">Welcome, {user?.firstName}!</h2>
        <p className="mb-2">Name: {user?.firstName} {user?.lastName}</p>
        <p>Email: {user?.email}</p>
        <button onClick={logout} className="bg-red-600 text-white mt-4 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
