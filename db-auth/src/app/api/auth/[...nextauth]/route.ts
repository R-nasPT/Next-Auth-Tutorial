import connectToDatabase from "@/libs/mongodb";
import UserSchema from "@/models/userSchema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { JWT } from "next-auth/jwt";
import { Account, NextAuthOptions, Session, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";

interface CustomUser extends User {
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placehoder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        await connectToDatabase();
        const user = await UserSchema.findOne({ email: credentials.email });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          // return ด้านล่างนี้จะส่งไปหา jwt
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(connectToDatabase) as unknown as Adapter,
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // ในกรณีไม่ใช้ adapter
    signIn: async ({ user, account }: { user: User; account: Account | null }) => {
      if (account && account.provider === "credentials") {
        return true;
      }
      if (account && account.provider === "google") {
        await connectToDatabase();
        try {
          const existingUser = await UserSchema.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new UserSchema({
              email: user.email,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Error saving user", error);
          return false;
        }
      }
      return true;
    },
    // return token จะส่งไปหา session
    // jwt: async ({ token, user }: { token: JWT; user?: User }) => {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as CustomUser).role;
        // token.role = (user as any).role
      }
      return token;
    },
    // session: async ({ session, token }: { session: Session; token: JWT }) => {
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  debug: false, //<-- ปิด [next-auth][warn][DEBUG_ENABLED]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
