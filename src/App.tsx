import { Routes, Route } from "react-router";
import { lazy } from "react";
import RootLayout from "./components/RootLayout/RootLayout";

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
        <Route index element={<HomePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/financial" element={<FinancialPage />} />
        <Route
          path="/financial/:financeId"
          element={<FinancialDetailsPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
