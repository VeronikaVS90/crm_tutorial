import { Routes, Route } from "react-router";
import { lazy } from "react";
import RootLayout from "./components/RootLayout";

const HomePage = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/Products"));
const FinancialPage = lazy(() => import("./pages/Financial"));

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/financial" element={<FinancialPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
