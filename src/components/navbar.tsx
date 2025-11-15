import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav className="container mx-auto h-20 px-4 flex items-center">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-10 h-10" />
      </Link>
    </nav>
  );
};

export default Navbar;
