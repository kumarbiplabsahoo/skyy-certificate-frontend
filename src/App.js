// import logo from "./logo.svg";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import MainLoader from "./components/ui/Loader";
import TopNavbar from "./layouts/TopNavbar";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./context/authContext";
import { DashProvider } from "./context/dashContext";
import AuthLoader from "./components/AuthLoader";
import Bulk from "./pages/certificate/Bulk";
import { SingleProvider } from "./context/singleContext";
import SingleCerificate from "./pages/certificate/SingleCerificate";

const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/main/Index"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthLoader />
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
                    <DashProvider>
                      <Dashboard />
                    </DashProvider>
                  </TopNavbar>
                </Suspense>
              }
            />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path="/single/:type"
              element={
                <Suspense fallback={<MainLoader />}>
                  <TopNavbar>
                    <SingleProvider>
                      <SingleCerificate />
                    </SingleProvider>
                  </TopNavbar>
                </Suspense>
              }
            />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path="/bulk/:type"
              element={
                <Suspense fallback={<MainLoader />}>
                  <TopNavbar>
                    <Bulk />
                  </TopNavbar>
                </Suspense>
              }
            />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path="/edit/:id?"
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

// Hook to access route parameters
export function useCertificateType() {
  const { type } = useParams();
  return type;
}
