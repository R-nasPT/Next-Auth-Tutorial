import NextAuth, { NextAuthConfig, User } from "next-auth";
import authConfig from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";

// const credentialsConfig = CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     username: { label: "Username", type: "text" },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials) {
//     const user = {
//       id: "123",
//       name: "qwerty",
//       email: "qwerty@Qwigley.com",
//       password: "1234",
//       role: "user1",
//     };
//     if (
//       credentials?.username === user.name &&
//       credentials?.password === user.password
//     ) {
//       return user;
//     } else return null;
//   },
// });

interface ExpandedUser extends User {
  role: string;
}

export const authOptions: NextAuthConfig = {
  // providers: [credentialsConfig],
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as ExpandedUser)?.role
      };
      // console.log({token});
      // token.custom = '55555'
      return token;
    },
    session: async ({session, token}) => {
      // if (session.user) {
      //   session.user.custom = "4444"
      // }
      if (token.sub && session.user) {
        session.user.id = token.sub,
        (session.user as any).role = token.role;
      }
      
      // console.log('sessionToken: ',token);
      // console.log({session});
      return session
    }
  },
};
// } satisfies NextAuthConfig <--- ใช้แบบนี้ก็ได้

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
