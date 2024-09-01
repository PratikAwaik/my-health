import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/ui/layout";
import { Toaster } from "./components/ui/toaster";

// pages
import HomePage from "./pages";
import SignInPage from "./pages/sign-in";
import MedicationsPage from "./pages/medications";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/medications",
    element: <MedicationsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <RouterProvider router={router} />
        <Toaster />
      </Layout>
    </QueryClientProvider>
  </StrictMode>
);
