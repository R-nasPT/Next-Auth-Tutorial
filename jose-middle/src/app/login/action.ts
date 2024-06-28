"use server";
import { SignJWT, importJWK } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  previousState: { message: string },
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  // if (email !== "1234" && password !== "1234") return { message: "Login fail" };
  // return { message: "Login attempted" };

  const secretJWK = {
    kty: "oct",
    k: process.env.JOSE_SECRET,
  };

  const secretKey = await importJWK(secretJWK, "HS256");
  const token = await new SignJWT({ email: email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

  cookies().set("token", token);

  redirect("/manage/blog");
  return { message: "Login success" };
}





// ====================== แบบไม่ใช้ jose =======================

("use server");
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  const token = sign({ email: email }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  cookies().set("token", token);

  redirect("/manage/blog");
  return { message: "Login success" };
}
