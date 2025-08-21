import { Outlet } from "react-router";
import { Suspense } from "react";
import Header from "./Header";
import CircularIndeterminate from "./Loader/Loader";

export default function RootLayout() {
  return (
    <>
      <Header />

      <main style={{ padding: "24px 24px 48px" }}>
        <Suspense fallback={<CircularIndeterminate />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
