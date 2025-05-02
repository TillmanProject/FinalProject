import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context with a default value
const AuthContext = createContext(undefined);

// Mock user database
const mockUsers = [{ id: "1", email: "demo@example.com", name: "Demo User" }];

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("taskUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Login function
  const login = async (email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find((u) => u.email === email);

        if (foundUser && password === "password") {
          // Simple password check
          setUser(foundUser);
          localStorage.setItem("taskUser", JSON.stringify(foundUser));
          navigate("/dashboard");
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000); // Simulate network delay
    });
  };

  // Signup function
  const signup = async (name, email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some((u) => u.email === email)) {
          reject(new Error("Email already in use"));
          return;
        }

        // Create new user
        const newUser = {
          id: String(mockUsers.length + 1),
          email,
          name,
        };

        mockUsers.push(newUser);
        setUser(newUser);
        localStorage.setItem("taskTangoUser", JSON.stringify(newUser));

        navigate("/dashboard");
        resolve();
      }, 1000); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskTangoUser");

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
