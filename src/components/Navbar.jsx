import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  Search,
  Wallet2,
  Sun,
  Moon,
  LogOut,
  UserCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDark);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-slate-900 dark:to-slate-800 shadow-md font-inter">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side - Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="h-9 w-9 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Center - Logo & Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-xl font-bold text-white tracking-wide"
          >
            PaySphere
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/dashboard"
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isActive("/dashboard")
                  ? "bg-white text-indigo-700"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Home className="inline h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <Link
              to="/schools"
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isActive("/schools")
                  ? "bg-white text-indigo-700"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Building className="inline h-4 w-4 mr-1" />
              Schools
            </Link>
            <Link
              to="/check-status"
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isActive("/check-status")
                  ? "bg-white text-indigo-700"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Search className="inline h-4 w-4 mr-1" />
              Status
            </Link>
            <Link
              to="/create-payment"
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                isActive("/create-payment")
                  ? "bg-white text-indigo-700"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <Wallet2 className="inline h-4 w-4 mr-1" />
              Payments
            </Link>
          </div>
        </div>

        {/* Right Side - Profile */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-1 rounded-full"
            >
              <UserCircle className="h-6 w-6" />
              <span className="hidden md:inline font-medium">{user.name}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg py-1 z-10 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
