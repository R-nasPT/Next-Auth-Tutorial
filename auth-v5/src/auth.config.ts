import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const credentialsConfig = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    // const res = await fetch("https://www.melivecode.com/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const response = await res.json();

    // if (response.status === "ok") {
    //   return response.user;
    // }

    // return null;
    const user = {
      id: "123",
      name: "qwerty",
      email: "qwerty@Qwigley.com",
      password: "1234",
      role: "user-3",
    };
    if (
      credentials?.username === user.name &&
      credentials?.password === user.password
    ) {
      return user;
    } else return null;
  },
});

export default {
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      // Check if the user is authenticated
      const isLoggedIn = !!auth?.user;
      // Initialize protected routes
      // Here, all routes except the login page is protected
      const isOnProtected = !nextUrl.pathname.startsWith("/login");
      if (isOnProtected && isLoggedIn) {
        return true;
      } else if (isLoggedIn) {
        // redirected to homepage
        return Response.redirect(new URL("/", nextUrl));
      }
      console.log({ isLoggedIn });
      console.log(234242432423432);

      return true;
    },
  },
  providers: [credentialsConfig],
} satisfies NextAuthConfig;
