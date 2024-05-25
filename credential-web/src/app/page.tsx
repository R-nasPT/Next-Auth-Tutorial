"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import profile from "../../public/assets/profile.png";

export default function Home() {
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // if (session) {
  //   return ( //<--- ต้องใส่ return ด้วย
  //     <>
  //       Signed in as {session.user?.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl">My App</div>
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center text-white focus:outline-none"
            >
              {session ? (
                <Image
                  // src={session?.user?.image!}
                  src={profile}
                  width={50}
                  height={50}
                  alt="profile"
                />
              ) : (
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {session ? (
                  <button
                    className="block px-4 py-2 text-gray-800 w-full hover:bg-gray-100"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="block px-4 py-2 text-gray-800 w-full hover:bg-gray-100"
                    onClick={() => signIn()}
                  >
                    LogIn
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      {session && (
        <>
          <h1>name {session.user?.name}</h1>
          <h1>Signed in as {session.user?.email}</h1>
        </>
      )}
    </>
  );
}
