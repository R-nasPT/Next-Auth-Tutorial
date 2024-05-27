"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setError("Password do not math!");
      return; //หยุดการทำงาน
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Register Page</h3>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="text"
            placeholder="Enter your name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="email"
            placeholder="Enter your email"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="password"
            placeholder="Enter your password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <input
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="password"
            placeholder="Confirm your password"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <button
            className="bg-green-500 p-2 rounded-md text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Do not have an account? go to{" "}
          <Link href="login" className="text-blue-500 hover:underline">
            Login
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}
