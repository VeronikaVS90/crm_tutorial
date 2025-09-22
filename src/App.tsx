import { Routes, Route } from "react-router";
import { lazy } from "react";
import RootLayout from "./components/RootLayout/RootLayout";
import PrivateRoute from "./components/Routes/PrivateRoute";

const HomePage = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetails"));
const FinancialPage = lazy(() => import("./pages/Financial"));
const FinancialDetailsPage = lazy(() => import("./pages/FinancialDetails"));
const Registration = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <PrivateRoute>
              <ProductDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/financial"
          element={
            <PrivateRoute>
              <FinancialPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/financial/:financeId"
          element={
            <PrivateRoute>
              <FinancialDetailsPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
