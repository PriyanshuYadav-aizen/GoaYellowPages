import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { NormalUserAuthProvider } from "./contexts/NormalUserAuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load all pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NormalUserLogin = lazy(() => import("./pages/NormalUserLogin"));
const NormalUserRegister = lazy(() => import("./pages/NormalUserRegister"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BusinessDetails = lazy(() => import("./pages/BusinessDetails"));
const BusinessEdit = lazy(() => import("./pages/BusinessEdit"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const BusinessAdminDashboard = lazy(
  () => import("./pages/BusinessAdminDashboard")
);

function App() {
  return (
    <AuthProvider>
      <NormalUserAuthProvider>
        <Router>
          <div className="min-h-screen">
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/user/login" element={<NormalUserLogin />} />
                  <Route
                    path="/user/register"
                    element={<NormalUserRegister />}
                  />
                  <Route
                    path="/business/:id/edit"
                    element={
                      <ProtectedRoute>
                        <BusinessEdit />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/business/:id" element={<BusinessDetails />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/business-admin"
                    element={
                      <ProtectedRoute>
                        <BusinessAdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/business-admin/:id"
                    element={
                      <ProtectedRoute>
                        <BusinessAdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
          </div>
        </Router>
      </NormalUserAuthProvider>
    </AuthProvider>
  );
}

export default App;
