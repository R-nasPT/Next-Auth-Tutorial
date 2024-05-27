"use client";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-[#333] text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">NextAuth</Link>
          </div>
          <ul className="flex">
            {!session ? (
              <>
                <li className="mx-3">
                  <Link href="/login">Sign In</Link>
                </li>
                <li className="mx-3">
                  <Link href="/register">Sign up</Link>
                </li>
              </>
            ) : (
              <>
                <li className="mx-3">
                  <Link
                    href="/welcome"
                    className="bg-gray-500 test-white border py-2 px-3 rounded-md text-lg my-2"
                  >
                    Profile
                  </Link>
                </li>
                <li className="mx-3">
                  <a
                    className="bg-red-500 test-white border py-2 px-3 rounded-md text-lg my-2 cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
