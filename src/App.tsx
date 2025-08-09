import { Routes, Route, Outlet, NavLink } from "react-router";
import { Products } from "./pages/Products";
import { Home } from "./pages/Home";
import { lazy, Suspense } from "react";

const FinancialPage = lazy(() => import("./pages/Financial"));

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "red" : "black",
                })}
                to="/financial"
              >
                Financial
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/financial" element={<FinancialPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
