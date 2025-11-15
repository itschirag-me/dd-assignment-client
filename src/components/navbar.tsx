import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";

const Navbar = () => {
  const brandId = localStorage.getItem("brandId");
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isCreateScreen = currentPath === "/";

  return (
    <nav className="container mx-auto h-20 px-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
      </Link>
      {brandId && isCreateScreen && (
        <Link to="/dashboard" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground hover:text-foreground">
            View Recent Insights
          </span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
