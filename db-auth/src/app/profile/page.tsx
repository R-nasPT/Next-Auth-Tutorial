"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const { data: session, status } = useSession();
//   console.log({ "sessionจ้าจ่ะอิอิ: ": session, status });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/");
    }
  });

  return (
    status === "authenticated" &&
    session.user && (
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Welcome User: {session.user.name}</h3>
        <p>Email: {session.user.email}</p>
        <p>ID: {(session.user as any).id}</p>
        <p>role: {(session.user as any).role}</p>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
          repellat dicta laboriosam ad rerum, sed vero perspiciatis explicabo
          facilis quasi aliquam voluptate totam consequuntur fuga saepe optio
          sit mollitia eligendi.
        </p>
        <button
          className="bg-blue-500 p-3 text-white rounded-md"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    )
  );
}
