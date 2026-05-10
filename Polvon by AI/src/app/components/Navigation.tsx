import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Briefcase, Search, Clock, PlusCircle, User, LogOut, Home } from "lucide-react";

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span className="text-xl text-gray-900">JobPortal</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm">Home</span>
              </Link>
              <Link
                to="/search"
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search Jobs</span>
              </Link>
              <Link
                to="/recent"
                className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">Recent Jobs</span>
              </Link>
              {isAuthenticated && user?.role === "employer" && (
                <Link
                  to="/post-job"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="text-sm">Post Job</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-900">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
