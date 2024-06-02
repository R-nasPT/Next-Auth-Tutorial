import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, importJWK } from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // เช็ค token ว่าตรงกันไหม คล้ายๆ middleware ใน express
    const secretJWK = {
      kty: "oct",
      k: process.env.JOSE_SECRET,
    };

    const secretKey = await importJWK(secretJWK, "HS256");
    const { payload } = await jwtVerify(token, secretKey);
    console.log("payload:", payload);

    if (payload.email !== "1234") {
      throw new Error("Email incorrect");
    }

    //แนบ header เพื่อเอาไปใช้ยัง component อื่นๆ
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: payload.email })); //<-- เหมือนกับการ set cookie หรือ localstorage

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
    // return NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/content/:path*", "/manage/:path*"],
};





// ====================== แบบไม่ใช้ jose =======================

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not defined");
    }

    const payload = verify(token, JWT_SECRET, { algorithms: ["HS256"] });

    if (typeof payload === "string" || payload.email !== "1234") {
      throw new Error("Email incorrect");
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify({ email: payload.email }));

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/content/:path*", "/manage/:path*"],
};
