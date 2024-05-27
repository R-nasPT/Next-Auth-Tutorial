"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Login Page</h3>
        <hr className="my-3" />
        <form action="">
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="text"
            placeholder="Enter your email"
          />
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="text"
            placeholder="Enter your password"
          />
          <button
            className="bg-green-500 p-2 rounded-md text-white"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Already have an account? go to{" "}
          <Link href="register" className="text-blue-500 hover:underline">
            Register
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}
