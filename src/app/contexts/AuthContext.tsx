import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  role: "jobseeker" | "employer";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: "jobseeker" | "employer") => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your backend
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "user-" + Date.now(),
      email,
      name: email.split("@")[0],
      role: "jobseeker",
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string, role: "jobseeker" | "employer") => {
    // Mock signup - in production, this would call your backend
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      id: "user-" + Date.now(),
      email,
      name,
      role,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
