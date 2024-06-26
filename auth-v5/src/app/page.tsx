import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  // console.log(session?.user);

  return (
    <main>
        <h1>Server Page</h1>
      {session && session.user ? (
        <div>
          <p>{session?.user.email}</p>
          <p>{(session.user as any).role}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </div>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn();
          }}
        >
          <button type="submit">Sign In</button>
        </form>
      )}
    </main>
  );
}
