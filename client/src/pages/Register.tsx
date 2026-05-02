import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [checkingUsers, setCheckingUsers] = useState(true);
  const [usersExist, setUsersExist] = useState(false);

  // Check if users already exist on component mount
  useEffect(() => {
    const checkExistingUsers = async () => {
      try {
        const query = `
          query GetUsers {
            getUsers {
              id
              name
              email
              role
            }
          }
        `;

        const response = await fetch("http://localhost:5001/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        });

        const result = await response.json();

        if (result.data && result.data.getUsers) {
          const userCount = result.data.getUsers.length;
          setUsersExist(userCount > 0);
        }
      } catch (error) {
        console.error("Error checking existing users:", error);
        // If we can't check, allow registration as fallback
        setUsersExist(false);
      } finally {
        setCheckingUsers(false);
      }
    };

    checkExistingUsers();
  }, []);

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
    setSuccess(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const { name, email, password } = formData;
      const response = await authAPI.register({ name, email, password });

      // Check if user was assigned super admin role
      if (response.user.role === "superadmin") {
        setIsSuperAdmin(true);
        setSuccess(
          "🎉 Congratulations! You are the first user and have been assigned Super Admin privileges. Please login with your credentials."
        );
      } else {
        setSuccess(
          "Registration successful! Please login with your credentials."
        );
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after 3 seconds (longer for super admin message)
      setTimeout(
        () => {
          navigate("/login");
        },
        isSuperAdmin ? 4000 : 2000
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking for existing users
  if (checkingUsers) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-50 px-4">
        <div className="card p-8">
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-100 border-t-primary-500"></div>
            <span className="ml-3 text-neutral-600">
              Checking system status...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show message if users already exist
  if (usersExist) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-neutral-50 px-4">
        <div className="card max-w-md p-8">
          <div className="text-center py-8">
            <div className="text-neutral-400 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="mb-4 font-display text-2xl font-bold text-neutral-900">
              Registration Closed
            </h2>
            <p className="text-neutral-600 mb-6">
               The system already has users registered.
            </p>
            <Link to="/login" className="btn-primary inline-block">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] bg-white md:grid-cols-2">
      <div className="hidden flex-col justify-center bg-gradient-to-br from-primary-500 to-secondary-600 p-16 text-white md:flex">
        <div className="mb-2 font-borel text-4xl">Goa Yellow Pages</div>
        <p className="mb-12 text-lg text-white/85">Set up the directory with a trusted admin account.</p>
        <div className="grid gap-4">
          {["Secure admin access", "Verified listing control", "Community trust tools"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-sm">
        <h2 className="mb-2 font-display text-2xl font-bold text-neutral-900">Create super admin</h2>
        <p className="mb-8 text-sm text-neutral-500">First user setup for Goa Yellow Pages.</p>

        <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4">
          <p className="text-sm text-primary-800">
            <strong>First User Setup:</strong> You are creating the first user
            account. This user will have Super Admin privileges and full system
            access.
          </p>
        </div>

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
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field py-3"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

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
              placeholder="Enter your password (min 6 characters)"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-neutral-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field py-3"
              placeholder="Confirm your password"
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
            {loading
              ? "Creating Super Admin Account..."
              : "Create Super Admin Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
