import { Routes, Route } from "react-router";
import { lazy, useEffect } from "react";
import RootLayout from "./components/RootLayout/RootLayout";
import PrivateRoute from "./components/Routes/PrivateRoute";
import RestrictedRoute from "./components/Routes/RestrictedRoute";
import { useQuery } from "@tanstack/react-query";
import { authService } from "./shared/services/auth";
import { authStore } from "./shared/store/auth";
import { tokenStore } from "./shared/store/tokens";

const HomePage = lazy(() => import("./pages/Home"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetails"));
const FinancialPage = lazy(() => import("./pages/Financial"));
const FinancialDetailsPage = lazy(() => import("./pages/FinancialDetails"));
const Registration = lazy(() => import("./pages/Registration"));
const Login = lazy(() => import("./pages/Login"));
const CustomersPage = lazy(() => import("./pages/Customers"));
const CustomerDetailsPage = lazy(() => import("./pages/CustomerDetails"));

function App() {
  const { data } = useQuery({
    queryFn: () => authService.current(),
    queryKey: ["currentUser"],
    enabled: !!tokenStore.accessToken,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (data) authStore.login(data.data.user);
  }, [data]);

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
        <Route
          path="/registration"
          element={
            <RestrictedRoute>
              <Registration />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          }
        />
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
        <Route
          path="/customers"
          element={
            <PrivateRoute><CustomersPage/></PrivateRoute>
          }
        />
        <Route
          path="/customers/:customerId"
          element={
            <PrivateRoute><CustomerDetailsPage/></PrivateRoute>
          }
        />
      </Route>

    </Routes>
  );
}

export default App;
