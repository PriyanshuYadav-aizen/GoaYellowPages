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
    <div className="grid min-h-[calc(100vh-4rem)] bg-white md:grid-cols-2">
      <div className="hidden flex-col justify-center bg-gradient-to-br from-primary-500 to-secondary-600 p-16 text-white md:flex">
        <div className="mb-2 font-borel text-4xl">Goa Yellow Pages</div>
        <p className="mb-12 text-lg text-white/85">Your trusted guide to Goa's best businesses</p>
        <ul className="space-y-4">
          {["Discover 500+ local businesses", "Read authentic reviews", "Get direct contact details"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-sm">
        <h2 className="mb-2 font-display text-2xl font-bold text-neutral-900">Welcome back</h2>
        <p className="mb-8 text-sm text-neutral-500">Sign in to find and contact trusted Goa businesses.</p>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-700">Email</label>
            <input id="email" name="email" type="email" className="input-field py-3" value={form.email} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-neutral-700">Password</label>
            <input id="password" name="password" type="password" className="input-field py-3" value={form.password} onChange={handleChange} required disabled={loading} />
          </div>
          <button type="submit" className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${loading ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "btn-primary"}`} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account? <Link to="/user/register" className="font-semibold text-primary-600 hover:text-primary-700">Register</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NormalUserLogin;


