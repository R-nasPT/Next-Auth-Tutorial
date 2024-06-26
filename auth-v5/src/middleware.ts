import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => { //<--แค่นี้ก็ใช้ได้แล้วถ้ากำหนดใน auth.config.ts
  // const isLoggedIn = !!req.auth;
  // console.log("ROUTE :", req.nextUrl.pathname);
  // console.log("Middleware", isLoggedIn);

//   if (req.nextUrl.pathname !== "login" && !isLoggedIn) {
//     return Response.redirect(new URL("/login", req.nextUrl));
//   }
});

// export default NextAuth(authConfig).auth;


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
