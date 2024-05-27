"use client";
import Navbar from "@/components/navbar";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function WelcomePage() {
  const { data: session } = useSession();

  if (!session) redirect("/login");


  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Welcome User {session?.user?.name}</h3>
        <p>{session?.user?.email}</p>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
          repellat dicta laboriosam ad rerum, sed vero perspiciatis explicabo
          facilis quasi aliquam voluptate totam consequuntur fuga saepe optio
          sit mollitia eligendi.
        </p>
      </div>
    </div>
  );
}
