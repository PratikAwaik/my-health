import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Layout } from "./components/ui/layout";
import { Toaster } from "react-hot-toast";

// pages
import HomePage from "./pages";
import SignInPage from "./pages/sign-in";
import MedicationsPage from "./pages/medications";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/AuthProvider";
import VitalsPage from "./pages/vitals";
import LabReportsPage from "./pages/lab-reports";
import ProfilePage from "./pages/profile";

// Create a client
const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const AppLayout = () => (
  <AuthProvider>
    <Layout>
      <Outlet />
    </Layout>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/medications", element: <MedicationsPage /> },
      { path: "/vitals", element: <VitalsPage /> },
      { path: "/lab-reports", element: <LabReportsPage /> },
      { path: "/profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
