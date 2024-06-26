"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function ClientPage() {
  const { data: session } = useSession();
//   console.log(session);
  
  return (
    <div>
        <h1>Client Page</h1>
      {session && session.user ? (
        <div>
          <p>{session?.user.email}</p>

          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  );
}
