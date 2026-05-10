import { Outlet, useLocation, Link } from "react-router";
import { Home, Bell, PlusCircle, MessageCircle, User } from "lucide-react";
import { AuthProvider } from "../contexts/AuthContext";
import { JobProvider } from "../contexts/JobContext";

export function RootLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Asosiy" },
    { path: "/notifications", icon: Bell, label: "Xabarlar" },
    { path: "/post-job", icon: PlusCircle, label: "E'lon" },
    { path: "/chat", icon: MessageCircle, label: "Chat" },
    { path: "/profile", icon: User, label: "Profil" },
  ];

  return (
    <AuthProvider>
      <JobProvider>
        <div className="min-h-screen bg-background">
          <main className="pb-20">
            <Outlet />
          </main>

          <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
            <div className="max-w-md mx-auto px-2 py-2">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  const isPostButton = item.path === "/post-job";

                  if (isPostButton) {
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex flex-col items-center justify-center w-14 h-14 -mt-8 bg-primary text-primary-foreground rounded-full shadow-lg transition-transform active:scale-95"
                      >
                        <Icon className="w-7 h-7" />
                      </Link>
                    );
                  }

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </JobProvider>
    </AuthProvider>
  );
}
