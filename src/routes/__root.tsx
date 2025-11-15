import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Navbar from "@/components/navbar";
// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen font-sans">
          <Navbar />
          <Outlet />
        </div>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
