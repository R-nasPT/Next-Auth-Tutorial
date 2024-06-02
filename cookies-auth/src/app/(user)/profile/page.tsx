"use client";
import { useAuthContext } from "@/app/contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
console.log(user);

  const handleLogout = async () => {
    try {
      const apiRes = await axios.post("http://localhost:3000/api/auth/logout");
      if (apiRes.data.success) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {}
  };
  if (user) {
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>;
  } else {
    return <div>Loding...</div>;
  }
}
