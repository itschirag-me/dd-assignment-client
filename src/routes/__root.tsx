import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "@/components/navbar";
// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="container mx-auto">
            <Outlet />
          </div>
        </div>
        <Toaster />
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
