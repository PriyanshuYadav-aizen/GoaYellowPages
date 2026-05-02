import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { normalUserAuthAPI } from "../services/normalUserAuth";

const NormalUserRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    try {
      await normalUserAuthAPI.register({ name: form.name, email: form.email, password: form.password });
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/user/login"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Create Account</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input id="name" name="name" type="text" className="input-field" value={form.name} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" className="input-field" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
          </div>
          <button type="submit" className={`w-full py-3 font-medium rounded-lg transition-colors duration-200 ${loading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "btn-primary"}`} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account? <Link to="/user/login" className="text-primary-600 hover:text-primary-700 font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NormalUserRegister;


