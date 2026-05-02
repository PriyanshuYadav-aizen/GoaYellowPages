import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      // Navigation will be handled by the useEffect above
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
          {["Manage verified business listings", "Track public directory activity", "Keep Goa's directory trustworthy"].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">
          <h2 className="mb-2 font-display text-2xl font-bold text-neutral-900">Admin sign in</h2>
          <p className="mb-8 text-sm text-neutral-500">Sign in to manage Goa Yellow Pages.</p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field py-3"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field py-3"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
              loading
                ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                : "btn-primary"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Register here
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
