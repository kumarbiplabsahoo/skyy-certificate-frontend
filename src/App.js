// import logo from "./logo.svg";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import MainLoader from "./components/ui/Loader";
import TopNavbar from "./layouts/TopNavbar";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/authContext";

const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/main/Index"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<MainLoader />}>
                <Login />
              </Suspense>
            }
          />

          {/* Protected Routes (Requires Auth) */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<MainLoader />}>
                  <TopNavbar>
                    <Dashboard />
                  </TopNavbar>
                </Suspense>
              }
            />
          </Route>

          {/* Redirect invalid paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
