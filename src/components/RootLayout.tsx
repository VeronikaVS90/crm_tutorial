import { Outlet } from "react-router";
import { Suspense } from "react";
import Header from "./Header";

export default function RootLayout() {
  return (
    <>
      <Header />

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
