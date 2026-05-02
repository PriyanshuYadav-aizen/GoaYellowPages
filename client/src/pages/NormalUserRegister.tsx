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
    <div className="grid min-h-[calc(100vh-4rem)] bg-white md:grid-cols-2">
      <div className="hidden flex-col justify-center bg-gradient-to-br from-primary-500 to-secondary-600 p-16 text-white md:flex">
        <div className="mb-2 font-borel text-4xl">Goa Yellow Pages</div>
        <p className="mb-12 text-lg text-white/85">Join Goa's business community.</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-3xl font-bold">500+</div><div className="text-sm text-white/75">Listings</div></div>
          <div><div className="text-3xl font-bold">4.5★</div><div className="text-sm text-white/75">Average</div></div>
          <div><div className="text-3xl font-bold">10K+</div><div className="text-sm text-white/75">Visitors</div></div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-sm">
        <h2 className="mb-2 font-display text-2xl font-bold text-neutral-900">Create your account</h2>
        <p className="mb-8 text-sm text-neutral-500">Save time when contacting Goa businesses.</p>
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold text-neutral-700">Full Name</label>
            <input id="name" name="name" type="text" className="input-field py-3" value={form.name} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-700">Email</label>
            <input id="email" name="email" type="email" className="input-field py-3" value={form.email} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-neutral-700">Password</label>
            <input id="password" name="password" type="password" className="input-field py-3" value={form.password} onChange={handleChange} required disabled={loading} />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-neutral-700">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" className="input-field py-3" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
          </div>
          <button type="submit" className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${loading ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "btn-primary"}`} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account? <Link to="/user/login" className="font-semibold text-primary-600 hover:text-primary-700">Login</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default NormalUserRegister;


