// import logo from "./logo.svg";
import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLoader from "./components/ui/Loader";
import TopNavbar from "./layouts/TopNavbar";
import PrivateRoute from "./PrivateRoute";
import { DashProvider } from "./context/dashContext";
import AuthLoader from "./components/AuthLoader";
import BulkCertificate from "./pages/certificate/BulkCertificate";
import { SingleProvider } from "./context/singleContext";
import SingleCertficate from "./pages/certificate/SingleCertficate";

const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/main/Index"));
const EditCert = lazy(() => import("./pages/certificate/EditCert"));

function App() {
  return (
    <>
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
              <TopNavbar>
                <SingleProvider>
                  <SingleCertficate />
                </SingleProvider>
              </TopNavbar>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/bulk/:type"
            element={
              <TopNavbar>
                <SingleProvider>
                  <BulkCertificate />
                </SingleProvider>
              </TopNavbar>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/edit/:id?"
            element={
              <TopNavbar>
                <SingleProvider>
                  <EditCert />
                </SingleProvider>
              </TopNavbar>
            }
          />
        </Route>

        {/* Redirect invalid paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;

// // Hook to access route parameters
// export function useCertificateType() {
//   const { type, id } = useParams();
//   return { type, id };
// }
