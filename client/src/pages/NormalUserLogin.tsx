import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNormalUserAuth } from "../contexts/NormalUserAuthContext";

const NormalUserLogin = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useNormalUserAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Login</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input id="email" name="email" type="email" className="input-field" value={form.email} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input id="password" name="password" type="password" className="input-field" value={form.password} onChange={handleChange} required disabled={loading} />
          </div>
          <button type="submit" className={`w-full py-3 font-medium rounded-lg transition-colors duration-200 ${loading ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "btn-primary"}`} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account? <Link to="/user/register" className="text-primary-600 hover:text-primary-700 font-medium">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NormalUserLogin;


