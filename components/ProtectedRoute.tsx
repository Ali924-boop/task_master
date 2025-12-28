"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // agar token nahi hai, login page pe bhej do
    if (!token) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return <div>Loading...</div>; // optional loading state
  return <>{children}</>;
};

export default ProtectedRoute;
